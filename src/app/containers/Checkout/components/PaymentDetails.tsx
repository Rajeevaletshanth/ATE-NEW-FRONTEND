import React, { FC, Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import mastercardPng from "images/mastercard.svg";
import visaPng from "images/vis.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";

const PaymentDetails = () => {
    return (
        <>
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                <div>
                    <h3 className="text-2xl font-semibold">Choose Payment Method</h3>
                    <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

                    <div className="mt-6">

                        <div className="flex justify-between my-5">
                            <div>Credit / Debit Card</div>
                            <div>
                                <button className=" text-red-500">Add new card</button>
                            </div>
                        </div>

                        <p className="mt-12">Card Details</p>
                        <div className="space-y-5 mt-6">
                            <div className="space-y-1">
                                <Label>Card holder </Label>
                                <Input defaultValue="JOHN DOE" />
                            </div>
                            <div className="space-y-1">
                                <Label>Card number </Label>
                                <Input defaultValue="111 112 222 999" />
                            </div>

                            <div className="flex space-x-5  ">
                                <div className="flex-1 space-y-1">
                                    <Label>Expiration date </Label>
                                    <Input type="date" defaultValue="MM/YY" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <Label>CVC </Label>
                                    <Input />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <ButtonPrimary href={"/pay-done"}>Confirm and pay</ButtonPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentDetails