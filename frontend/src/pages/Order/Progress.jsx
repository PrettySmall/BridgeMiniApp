import React from "react";
import { Step, Stepper } from "react-form-stepper";

const Steps = [
    {
        label: "Deposit",
        icon: "deposit"
    },
    {
        label: "Confirm",
        icon: "wait"
    },
    {
        label: "Exchange",
        icon: "exchange"
    },
    {
        label: "Complete",
        icon: "complete"
    },
]

const Progress = ({ step }) => {
    return (
        <Stepper
            activeStep={step}
            styleConfig={{ size: 48, completedBgColor: '#008fdf', activeBgColor: '#206a9160', inactiveBgColor: '#206a9160', labelFontSize: 16 }}
            connectorStyleConfig={{ size: 1, stepSize: 48, completedColor: '#008fdf', activeColor: '008fdf' }}
            className={"w-full !p-0 !py-8"}
        >
            {Steps.map((stepItem, index) => {
                return (
                    <Step label={stepItem.label} key={`step_${index}`}>
                        <span class={`material-symbols-outlined ${(index + 1) == step ? 'rotate' : '' }`}>
                            <img src={`/images/order/${stepItem.icon}.png`} className="w-6" alt="currency" />
                        </span>
                    </Step>
                )
            })}
        </Stepper>
    )
}

export default Progress