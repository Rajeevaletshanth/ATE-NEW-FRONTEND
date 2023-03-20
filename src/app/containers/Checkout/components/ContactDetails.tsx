import React, { FC, Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Checkbox from "shared/Checkbox/Checkbox";

import ButtonPrimary from "shared/Button/ButtonPrimary";

const ContactDetails = () => {
    return (
        <>
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8 mb-8">
                <div>
                    <h3 className="text-2xl font-semibold">Contact Details</h3>
                    <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

                    <div className="mt-6 space-y-6">

                        <div className="flex space-x-5  ">
                            <div className="flex-1 space-y-1">
                                <Label>Name</Label>
                                <Input defaultValue="JOHN DOE" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label>Phone</Label>
                                <Input type="tel" defaultValue="0123456789" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label>Address</Label>
                            <Input type="text" defaultValue="NewYork US" />
                        </div>
                        <div className="space-y-1">
                            <Label>Landmark</Label>
                            <Input type="text" defaultValue="NewYork US" />
                        </div>
                        {/* checkbox01  */}
                        <div>
                        <Label className="">Address Label (optional)</Label>
                        <div className="flex space-x-5 mt-3">
                            <div className="flex-1 space-y-1">
                                
                                <Checkbox
                                    label="Home"
                                    defaultChecked
                                    name=""
                                />

                            </div>
                            <div className="flex-1 space-y-1">
                                <Checkbox
                                    label="Work"
                                    name=""
                                />
                            </div>
                        </div>
                        </div>
                        {/* checkbox 02  */}
                        <div className="">
                        <Label className="">Deliver To</Label>
                        <div className="flex space-x-5 mt-3">
                            <div className="flex-1 space-y-1">
                                
                                <Checkbox
                                    label="Deliver to door"
                                    name=""
                                />

                            </div>
                            <div className="flex-1 space-y-1">
                                <Checkbox
                                    label="Pickup Outside"
                                    defaultChecked
                                    name=""
                                />
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

export default ContactDetails