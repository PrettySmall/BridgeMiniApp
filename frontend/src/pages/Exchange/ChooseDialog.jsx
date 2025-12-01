import React from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle
} from "@headlessui/react";

import Coins from "@/constants/Coins";
import { useAppContext } from "@/contexts/AppContext";

const ChooseDialog = ({ open, setOpen, direction }) => {
    const { setCurrency1, setCurrency2 } = useAppContext()

    const handleCurrencyChange = (currency) => {
        if (direction === 'send') {
            setCurrency1(currency)
        } else {
            setCurrency2(currency)
        }
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10" >
            <DialogBackdrop
                transition
                className="w-full fixed inset-0 bg-black bg-opacity-60 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="w-full fixed inset-0 z-10 overflow-y-auto">
                <div className="flex w-full max-w-96 m-auto min-h-full items-center justify-center text-center">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-[#206a91] p-4 w-full"
                    >
                        <div className="flex justify-center mb-4">
                            <DialogTitle as="h3" className="text-2xl convergence">
                                Select Currency
                            </DialogTitle>
                        </div>
                        <div className="w-full flex flex-col gap-2 max-h-80 overflow-y-auto">
                            {Coins.map((coin, index) => {
                                return (
                                    <div className="flex items-center justify-between p-1 pb-2 border-b cursor-pointer" onClick={() => handleCurrencyChange(coin)} key={`${coin.name}_${index}`}>
                                        <div className="flex items-center gap-1">
                                            <div>
                                                <img src={`/images/coins/${coin.currency}.svg`} className="w-8" alt="currency" />
                                            </div>
                                            <div className="text-lg">{coin.name}</div>
                                        </div>
                                        <div>
                                            <div className="uppercase">{coin.currency}</div>
                                            {coin.currency !== coin.network &&
                                                <div className="flex items-center justify-center gap-0.5 bg-black rounded-sm">
                                                    <img src={`/images/coins/${coin.network}.svg`} className="w-3" alt="network" />
                                                    <div className="text-xs uppercase">{coin.network}</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="py-1 px-3 mt-4 convergence text-lg bg-white text-[#206a91] w-32 rounded-lg" onClick={() => setOpen(false)}>Cancel</div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    );
}

export default ChooseDialog