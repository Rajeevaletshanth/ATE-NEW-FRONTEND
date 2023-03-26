import React, { FC, useState } from "react";
import "./stepper.css"
import { TiTick, } from "react-icons/ti";
import {BsFillCartFill,BsFillCartCheckFill} from "react-icons/bs";
import {FaShippingFast} from "react-icons/fa"
import {GoHome} from "react-icons/go"
import {SlBadge} from "react-icons/sl"

export interface StepperProps {
    currentStep: number;
    complete: boolean;
}

const Stepper: FC<StepperProps> = ({currentStep, complete}) => {
    const steps = ["Pending", "Accepted", "Dispatched", "Delivered", "Rate Us"];
    const stepsvg = [
        <BsFillCartFill size={25} className="fill-white"/>,
        <BsFillCartCheckFill size={25} className="fill-white"/>,
        <FaShippingFast size={25} className="fill-white"/>,
        <TiTick  size={30} className="fill-white"/>,
        <SlBadge size={25} className="fill-white"/>
    ]

    return (
        <>
            <div className="hidden md:flex justify-center flex-col md:flex-row items-center pt-20">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`step-item  ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
                            } `}
                    >
                        <div className="step">
                             {i + 1 < currentStep || complete ? stepsvg[i]   : stepsvg[i]}
                        </div>
                        <p className="text-gray-800 dark:text-gray-50 text-sm font-medium mt-2">{step}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Stepper;