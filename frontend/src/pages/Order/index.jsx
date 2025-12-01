import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScrollShadow } from "@nextui-org/react";
import { shortenAddress } from "@/utils/normal";
import copy from "copy-to-clipboard";

import { useAppContext } from "@/contexts/AppContext";
import Progress from "./Progress";
import ExchangeItem from "./ExchangeItem";
import CountDown from "./CountDown";
import { useWebsocket } from "@/contexts/WebsocketProvider";
import { getOrder } from "@/api";
import Coins from "@/constants/Coins";

const Order = () => {
    const navigate = useNavigate()
    const { order_id } = useParams();
    const { createdTime, destination, isAuthenticated,
        amount, currency1, currency2,
        setAmount, setCurrency1, setCurrency2,
        setCreatedTime, setDestination, setToAmount } = useAppContext()
    const { apiWs } = useWebsocket()

    const [step, setStep] = useState(1)
    const [txId, setTxId] = useState()
    const [depositAddress, setDepAddress] = useState()

    const connectWebsocket = () => {
        if (!apiWs || !isAuthenticated) return
        let authToken = localStorage.getItem("jwtToken");
        apiWs.sendMessage([
            'order:connect',
            { token: authToken, order_id: order_id }
        ])

        const listenerMsgId = apiWs.registerListener(
            `order:${order_id}`,
            (message) => {
                console.log("!!!!!!!!!!!!!!", message)
                if (message.status < 5) {
                    setStep(message.status)
                } else {
                    setStep(0)
                }

                if (message.sentHash) {
                    setTxId(message.sentHash)
                }
                if (message.depAmount) {
                    setAmount(message.depAmount)
                }
                if (message.toAmount) {
                    setToAmount(message.toAmount)
                }
            })
        return { listenerMsgId }
    }
    const getOrderStatus = async () => {
        let order = await getOrder(order_id)
        if (order) {
            setStep(order.status)
            setTxId(order.sentHash)
            setDepAddress(order.depAddr)
            setAmount(order.depAmount)
            setToAmount(order.toAmount)
            let fromCurrency = Coins.find((item) => item.ccy === order.fromCcy)
            let toCurrency = Coins.find((item) => item.ccy === order.toCcy)
            setCurrency1(fromCurrency)
            setCurrency2(toCurrency)
            setCreatedTime(order.timestamp)
            setDestination(order.toAddr)
        }
    }
    useEffect(() => {
        if (isAuthenticated && order_id) {
            const { listenerMsgId } =
                connectWebsocket() || {}
            getOrderStatus()
            return () => {
                let authToken = localStorage.getItem("jwtToken");
                apiWs?.sendMessage([
                    'order:disconnect',
                    { token: authToken, order_id: order_id }
                ])
                if (listenerMsgId) apiWs?.removeListener(listenerMsgId)
            }
        }
    }, [apiWs, isAuthenticated, order_id])


    return (
        <ScrollShadow className="flex flex-col h-screen p-4 items-center pt-20">
            <div className="w-full flex flex-col gap-2 convergence">
                <div className="flex flex-col items-center mb-8">
                    <img src="/images/order/progress.png" className="w-72 p-1" alt="progress" />
                </div>
                <div className="w-full flex justify-between bg-[#008fdf] p-4 rounded-lg mt-4">
                    <ExchangeItem send={true} />
                    <img src={`/images/order/right.svg`} className="w-8 mx-1" alt="right" />
                    <ExchangeItem send={false} />
                </div>
                <div className="w-full flex justify-between bg-[#008fdf] p-4 rounded-lg mt-4">
                    <div className="flex flex-col items-center">
                        <div className="text-sm text-black">Order Id</div>
                        <div className="h-12 flex items-center">
                            <div className="text-xl">{shortenAddress(order_id, 3)}</div>
                            <img src={`/images/common/copy.svg`} className="w-8 h-8 cursor-pointer" alt="copy" onClick={() => copy(order_id)} />
                        </div>
                    </div>
                    <div className="h-full w-[1px] bg-white" />
                    <div className="flex flex-col items-center">
                        <div className="text-sm text-black">Time Remaining</div>
                        <div className="h-12 flex items-center">
                            <CountDown />
                        </div>
                    </div>
                    <div className="h-full w-[1px] bg-white" />
                    <div className="flex flex-col items-center">
                        <div className="text-sm text-black">Creation Time</div>
                        <div className="text-xl max-w-32 text-center h-12">{new Date(createdTime).toLocaleDateString('en-US', { month: 'short', day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>
                    </div>
                </div>
                <Progress step={step} />
                <div className="w-full flex flex-col justify-between bg-[#008fdf] p-4 rounded-lg">
                    <div className="text-sm text-black">Send <span className="text-white text-xl uppercase">{amount} {currency1.currency}</span> to the address</div>
                    <div className="text-xl flex items-center justify-between">
                        <div>{shortenAddress(depositAddress)}</div>
                        <img src={`/images/common/copy.svg`} className="w-8 h-8 cursor-pointer" alt="copy" onClick={() => copy(depositAddress)} />
                    </div>
                    <div className="h-[1px] w-full bg-white my-2" />
                    <div className="text-sm text-black">Receiving address <span className="text-white text-xl uppercase">{currency2.currency}</span></div>
                    <div className="text-xl flex items-center justify-between">
                        <div>{shortenAddress(destination)}</div>
                        <img src={`/images/common/copy.svg`} className="w-8 h-8 cursor-pointer" alt="copy" onClick={() => copy(destination)} />
                    </div>
                    {txId && (
                        <div className="text-xl flex items-center justify-between">
                            <div>{shortenAddress(txId)}</div>
                            <img src={`/images/common/copy.svg`} className="w-8 h-8 cursor-pointer" alt="copy" onClick={() => copy(destination)} />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full flex items-center justify-center my-12">
                <div className="w-full flex items-center justify-center">
                    <div className="py-1 px-3 mt-4 convergence text-lg bg-white text-[#206a91] w-40 rounded-lg text-center cursor-pointer" onClick={() => navigate('/')} >Back</div>
                </div>
            </div>
        </ScrollShadow>
    )
}

export default Order