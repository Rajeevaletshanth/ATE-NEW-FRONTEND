import React, {useState, useEffect} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import PaymentCardModal from "../PaymentCard/PaymentCardModal";
import ListCard from "../PaymentCard/ListCard";
import Heading from "components/Heading/Heading";


const AccountBilling = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  const [cards, setCardList] = useState<any>([])
  

  return (
    <div>
      <CommonLayout>
        <div className="pt-1 pb-1  rounded-2xl">
          <div className="container relative space-y-4 mb-24 mt-4 lg:space-y-4 lg:mb-28">
            <div className="space-y-6 sm:space-y-8">
              {/* <h2 className="text-3xl font-semibold">Payments & payouts</h2> */}
              
              {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
              <div className="w-full sm:px-20">
                <Heading children="Payments & Payouts" isCenter={false} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ListCard refresh={refresh} setRefresh={setRefresh} setCardList={setCardList}/>
                  </div>
                  <div className="pt-10 flex justify-center">
                    <PaymentCardModal refresh={refresh} setRefresh={setRefresh} cards={cards}/>
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
