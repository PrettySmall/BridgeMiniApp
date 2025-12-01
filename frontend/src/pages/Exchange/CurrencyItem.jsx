import React, { useEffect, useState } from "react";
import ChooseDialog from "./ChooseDialog";
import { useAppContext } from "@/contexts/AppContext";
import { getAmount } from "@/api";

const CurrencyItem = ({ direction }) => {
    const { currency1, currency2, amount, setAmount, toAmount, setToAmount } = useAppContext()
    const [openChoose, setOpenChoose] = useState(false)
    const [currencyInfo, setCurrencyInfo] = useState(null)

    const isSendCurrency = direction === 'send'

    const handleAmountChange = async (e) => {
        setAmount(e.target.value)
        let amount = Number(e.target.value)
        if (!isNaN(amount)) {
            let targetAmount = await getAmount(currency1.ccy, currency2.ccy, amount)
            if (targetAmount != null) {
                setToAmount(targetAmount)
            }
        }
    }

    useEffect(() => {
        if (isSendCurrency) {
            setCurrencyInfo(currency1)
        } else {
            setCurrencyInfo(currency2)
        }
    }, [currency1, currency2])

    if (!currencyInfo) {
        return null
    }

    return (
        <div className="w-full">
            <div className="text-[16px] ml-2 capitalize text-black">{direction}</div>
            <div className="w-full flex items-center justify-betweens border rounded-md p-2">
                <input className="w-full bg-transparent outline-none text-xl px-2" value={isSendCurrency ? amount : toAmount} onChange={handleAmountChange} disabled={!isSendCurrency} />
                <div className="w-28 flex items-center justify-end gap-1 mr-2" onClick={() => setOpenChoose(true)}>
                    <img src={`/images/coins/${currencyInfo.currency}.svg`} className="w-8" alt="token" />
                    <div>
                        <div className="uppercase">{currencyInfo.currency}</div>
                        {currencyInfo.currency !== currencyInfo.network &&
                            <div className="flex items-center justify-center gap-0.5 -mt-1 bg-black rounded-sm">
                                <img src={`/images/coins/${currencyInfo.network}.svg`} className="w-3" alt="network" />
                                <div className="text-xs uppercase">{currencyInfo.network}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* {isSendCurrency ?
                <div className="text-sm ml-2 text-black uppercase">1 {currency1.currency} ~ {rate} {currency2.currency}</div>
                :
                <div className="text-sm ml-2 text-black uppercase">1 {currency2.currency} ~ {1 / rate} {currency1.currency}</div>
            } */}
            <ChooseDialog open={openChoose} setOpen={setOpenChoose} direction={direction} />
        </div>
    )
}

export default CurrencyItem