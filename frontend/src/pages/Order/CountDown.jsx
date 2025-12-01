import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const CountDown = () => {
    const { createdTime } = useAppContext()
    const [targetTime, setTargetTime] = useState(createdTime + 30 * 60 * 1000)

    useEffect(() => {
        setTargetTime(createdTime + 30 * 60 * 1000)
    }, [createdTime])

    const renderer = ({ minutes, seconds, completed }) => {

        if (completed) {
            return (
                <div className="flex rounded-lg items-end gap-2 justify-center">
                    <span className="text-shot text-[#ff0000] text-2xl">Expired.</span>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col rounded-lg items-center">
                    <div className="gap-1">
                        <span className="text-white text-2xl ml-2">{minutes < 10 ? `0${minutes}` : minutes}</span>
                        <span className="ml-2">:</span>
                        <span className="text-white text-2xl ml-2">{seconds < 10 ? `0${seconds}` : seconds}</span>
                    </div>
                </div>
            );
        }
    };

    return (
        <Countdown
            date={targetTime}
            renderer={renderer}
        />
    )
}

export default CountDown