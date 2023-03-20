import React, { FC, Fragment, useState } from "react";
import Sidebar from "./components/Sidebar";
import ContactDetails from "./components/ContactDetails";
import PaymentDetails from "./components/PaymentDetails";


export interface CheckoutProps {
  className?: string;
}

const Checkout: FC<CheckoutProps> = ({ className = "" }) => {

  return (
    <div className={`nc-Checkout ${className}`} data-nc-id="Checkout">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          <ContactDetails />
          <PaymentDetails />
        </div>

        <div className=" lg:block flex-grow">
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

export default Checkout;
