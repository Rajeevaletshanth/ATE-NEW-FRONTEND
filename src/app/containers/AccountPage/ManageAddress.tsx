import React, { useState, useEffect } from "react";
import CommonLayout from "./CommonLayout";
import Heading from "components/Heading/Heading";
import AddressCardModal from "./Components/AddressCards/AddressCardModal";
import ListAddress from "./Components/AddressCards/ListAddress";


const ManageAddress = () => {

    const [address,setAddress] = useState<any>([])
    const [refresh,setRefresh] = useState<boolean>(false)

    return (
        <div>
            <CommonLayout>
                <div className="pt-1 pb-1  rounded-2xl">
                    <div className="relative space-y-4 mb-24 mt-4 lg:space-y-4 lg:mb-28">
                        <div className="space-y-6 sm:space-y-8">
                        <div className="w-full sm:px-20">
                            <Heading children="Manage Address" isCenter={false} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ListAddress refresh={refresh} setRefresh={setRefresh} setAddressList={setAddress}/>
                            </div>
                            <div className="pt-10 flex justify-center">
                                <AddressCardModal refresh={refresh} setRefresh={setRefresh} address={address}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </div>
    );
};

export default ManageAddress;
