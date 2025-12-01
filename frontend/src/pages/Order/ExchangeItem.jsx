import { useAppContext } from "@/contexts/AppContext";
import { localizedNumber } from "@/utils/normal";
import React from "react";

const ExchangeItem = ({ send }) => {
    const { currency1, currency2, amount, toAmount } = useAppContext()

    const currency = send ? currency1 : currency2

    return (
        <div className={`w-full flex items-center justify-end gap-1 ${!send && 'flex-row-reverse'}`}>
            <div className={`flex flex-col ${send ? 'items-end' : 'items-start'}`}>
                <div className="text-sm text-black">You {send ? 'Send' : 'Receive'}</div>
                <div className="text-3xl font-semibold">{send ? amount : localizedNumber(toAmount)}</div>
                <div className="flex">
                    <div className="uppercase">{currency.currency}</div>
                    {currency.currency !== currency.network && <div className="text-xs uppercase">{currency.network}</div>}
                </div>
            </div>
            <img src={`/images/coins/${currency.currency}.svg`} className="w-10" alt="coin1" />
        </div>
    )
}

export default ExchangeItem