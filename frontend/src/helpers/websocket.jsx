import { isJson } from '../utils/normal';

const WebSocketClientStatus = {
    CONNECTED: 1,
    DISCONNECTED: 2,
    CONNECTING: 3,
}

export class WebsocketClient {
    url;
    status;
    socket;
    messageQueue = [];

    listeners;
    lastListenerId;
    shouldReconnect = true;
    reconnectInterval = 3000;

    constructor(url) {
        this.url = url;
        this.listeners = [];
        this.lastListenerId = 0;
        this.status = WebSocketClientStatus.DISCONNECTED;
        this.open();
    }

    open() {
        if (!this.socket && this.status == WebSocketClientStatus.DISCONNECTED) {
            console.log(`[WebsocketClient] Instance created. Trying to connect`);
            this.socket = new WebSocket(this.url, this.protocols);

            this.socket.onopen = () => {
                this.onConnect();
                this.processMessageQueue();
            };
            this.socket.onmessage = this.onMessage.bind(this);
            this.socket.onerror = this.onError.bind(this);
            this.socket.onclose = this.onDisconnect.bind(this);
        }
    }

    close() {
        if (this.socket) {
            this.status = WebSocketClientStatus.DISCONNECTED;
            this.socket.close();
            this.socket = null;
            console.log('[WebsocketClient] Disconnected');
        }
    }

    onConnect() {
        console.log('[WebsocketClient] Connected');
        this.status = WebSocketClientStatus.CONNECTED;
        this.processMessageQueue();
    }

    onDisconnect() {
        console.log('[WebsocketClient] Disconnected');
        this.status = WebSocketClientStatus.DISCONNECTED;
        if (this.shouldReconnect) {
            console.log('[WebsocketClient] Attempting to reconnect...');
            setTimeout(() => this.open(), this.reconnectInterval);
        }
    }

    onMessage(event) {
        const data = isJson(event.data) ? JSON.parse(event.data) : event.data;
        let type;
        let payload;

        // TODO: get api to return websocket data is a similar format to birdeye,
        // or move birdeye websocket to backend so we can customize payload
        // the following checks the format and extracts type and payload
        if (typeof data === 'object') {
            if (Array.isArray(data)) {
                type = data[0];
                payload = data[1];
            } else {
                type = data.type;
                payload = data.data;
            }
            this.listeners.forEach(listener => {
                if (listener.event.name === type) {
                    listener.fn(payload);
                }
            });
        }
    }

    onError(event) {
        console.log('[WebsocketClient] Error:', event);
    }

    processMessageQueue() {
        while (this.messageQueue.length > 0 && this.status === WebSocketClientStatus.CONNECTED) {
            const data = this.messageQueue.shift();
            this.sendMessage(data);
        }
    }

    registerListener(eventType, callback) {
        const id = this.lastListenerId++;
        const listenerIndex = this.listeners.findIndex(listener => listener.event.uniqueName === eventType);
        if (listenerIndex === -1) {
            this.listeners.push({ id, event: { name: eventType, uniqueName: `${eventType}-${id}` }, fn: callback });
            return id;
        }
        return this.listeners[listenerIndex].id;
    }

    removeListener(listenerId) {
        this.listeners = this.listeners.filter(listener => listener.id !== listenerId);
    }

    sendMessage(data) {
        if (this.status === WebSocketClientStatus.CONNECTED && this.socket) {
            const stringified = JSON.stringify(data);
            this.socket.send(stringified);
            // console.log(`[WebsocketClient] Sending message: ${stringified}`);
        } else {
            console.log('[WebsocketClient] Cannot send message, socket not connected');
            this.messageQueue.push(data);
        }
    }
}
