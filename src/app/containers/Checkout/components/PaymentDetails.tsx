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
                    <h3 className="text-2xl font-semibold">Payment Details</h3>
                    <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

                    <div className="mt-6">
                        <Tab.Group>
                            <Tab.List className="flex my-5">
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${selected
                                                ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                                                : "text-neutral-6000 dark:text-neutral-400"
                                                }`}
                                        >
                                            Paypal
                                        </button>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <button
                                            className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${selected
                                                ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                                                : " text-neutral-6000 dark:text-neutral-400"
                                                }`}
                                        >
                                            <span className="mr-2.5">Credit card</span>
                                            <img className="w-8" src={visaPng} alt="" />
                                            <img className="w-8" src={mastercardPng} alt="" />
                                        </button>
                                    )}
                                </Tab>
                            </Tab.List>

                            <Tab.Panels>
                                <Tab.Panel className="space-y-5">
                                    <div className="space-y-1">
                                        <Label>Card number </Label>
                                        <Input defaultValue="111 112 222 999" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Card holder </Label>
                                        <Input defaultValue="JOHN DOE" />
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
                                    <div className="space-y-1">
                                        <Label>Messager for author </Label>
                                        <Textarea placeholder="..." />
                                        <span className="text-sm text-neutral-500 block">
                                            Write a few sentences about yourself.
                                        </span>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel className="space-y-5">
                                    <div className="space-y-1">
                                        <Label>Email </Label>
                                        <Input type="email" defaultValue="example@gmail.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Password </Label>
                                        <Input type="password" defaultValue="***" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Messager for author </Label>
                                        <Textarea placeholder="..." />
                                        <span className="text-sm text-neutral-500 block">
                                            Write a few sentences about yourself.
                                        </span>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
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