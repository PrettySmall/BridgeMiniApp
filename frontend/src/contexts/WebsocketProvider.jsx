import { createContext, useContext, useEffect, useState } from 'react';
import { WebsocketClient } from '../helpers/websocket';

export const WebsocketContext = createContext({
  apiWs: undefined,
});

export function WebsocketProvider({ children }) {
  const [apiClient, setApiClient] = useState(undefined);

  useEffect(() => {
    const apiWs = new WebsocketClient (import.meta.env.VITE_WSS_URL);

    setApiClient(apiWs);

    return () => {
      apiWs.close();
      setApiClient(undefined);
    };
  }, []);

  return <WebsocketContext.Provider value={{ apiWs: apiClient }}>{children}</WebsocketContext.Provider>;
}

export function useWebsocket() {
  const context = useContext(WebsocketContext);
  if (!context) throw Error('useWebsocket can only be used within the WebsocketProvider component');
  return context;
}
