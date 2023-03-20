import React, {useState, useEffect} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import PaymentCardModal from "../PaymentCard/PaymentCardModal";
import ListCard from "../PaymentCard/ListCard";


const AccountBilling = () => {
  const [refresh, setRefresh] = useState<boolean>(false)

  return (
    <div>
      <CommonLayout>
        <div className="pt-1 pb-1 bg-gray-100 dark:bg-neutral-800 rounded-2xl">
          <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl font-semibold">Payments & payouts</h2>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="max-w-2xl">
                <ListCard refresh={refresh} setRefresh={setRefresh}/>
                <div className="pt-10">
                  <PaymentCardModal refresh={refresh} setRefresh={setRefresh}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountBilling;
