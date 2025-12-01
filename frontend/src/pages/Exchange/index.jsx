import React, { useState } from "react"
import { ScrollShadow } from "@nextui-org/react"
import CurrencyItem from "./CurrencyItem"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "@/contexts/AppContext"
import { validateEVMAddress, validateSolAddress, validateTronAddress } from "@/utils/normal"
import { toast } from "react-toastify"
import { createOrder } from "@/api"

const Exchange = () => {
    const nagivate = useNavigate()
    const { amount, destination, setDestination, setCreatedTime, currency2, currency1 } = useAppContext()

    const handleExchange = async () => {
        let valid = false
        switch (currency2.network) {
            case 'eth': {
                valid = validateEVMAddress(destination)
                break;
            }
            case 'trx': {
                valid = await validateTronAddress(destination)
                break;
            }
            case 'sol': {
                valid = validateSolAddress(destination)
            }
        }
        console.log("address validation", valid)
        let sendAmount = Number(amount)
        if (isNaN(sendAmount) || sendAmount <= 0) {
            toast.error("Please input correct amount")
            return
        }
        if (!valid) {
            toast.error("Please input correct address")
            return
        }
        // setCreatedTime(Date.now())
        let params = {
            fromCcy: currency1.ccy,//generate
            toCcy: currency2.ccy,//generate
            depositAmount: sendAmount,
            toAddr: destination
        }
        let order = await createOrder(params)
        if (order) {
            nagivate(`/order/${order.order_id}`)
        } else {
            toast.error("Order failed")
        }
    }

    return (
        <ScrollShadow className="flex flex-col h-screen p-8 items-center pt-20">
            <div className="w-full flex flex-col gap-8 convergence">
                <div className="flex flex-col items-center mb-8">
                    <img src="/images/home/title.png" className="w-72 p-1" alt="title" />
                </div>
                <div>
                    <CurrencyItem direction="send" />
                    <div className="w-full flex items-center justify-center my-2">
                        <img src="/images/home/direction.svg" className="w-12 p-1 rounded-full" alt="direction" />
                    </div>
                    <CurrencyItem direction="receive" />
                </div>
                <div>
                    <div className="text-[16px] ml-2 mt-4 text-black">Destination</div>
                    <input className="w-full bg-transparent outline-none border rounded-md p-2 text-xl px-4" value={destination} onChange={e => setDestination(e.target.value)} />
                </div>
                <div className="w-full flex items-center justify-center my-12">
                    <div className="w-full flex items-center justify-center">
                        <div className="py-1 px-3 mt-4 convergence text-lg bg-white text-[#206a91] w-40 rounded-lg text-center cursor-pointer" onClick={handleExchange}>Exchange now</div>
                    </div>
                </div>
            </div>
        </ScrollShadow>
    )
}

export default Exchange