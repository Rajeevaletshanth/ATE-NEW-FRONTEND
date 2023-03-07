import React, { FC, useState } from "react";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import DeliverySearchForm from "./DeliverySearchForm";
import Button, { ButtonProps } from "shared/Button/Button";

export type SearchTab = "Delivery" | "Pickup" | "Dining" ;

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?: "Delivery" | "Pickup" | "Dining";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Delivery",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Delivery", "Pickup", "Dining"];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);
  // ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50
  // text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400
  const renderTab = () => {
    return (
        <ul className="space-x-5 sm:space-x-8 lg:space-x-11 flex justify-center">
          {tabs.map((tab) => {
            const active = tab === tabActive;
            return (
              <button
                onClick={() => setTabActive(tab)}
                className={`text-gray-100 hover:bg-gray-100 hover:text-gray-900 rounded-full px-5 py-2 ${
                  active
                    ? "bg-red-600 hover:bg-red-500 hover:text-gray-100"
                    : ""
                } `}
                key={tab}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    switch (tabActive) {
      case "Delivery":
        return <DeliverySearchForm haveDefaultValue={isArchivePage} />;
      case "Pickup":
        return <DeliverySearchForm haveDefaultValue={isArchivePage} />;
      case "Dining":
        return <DeliverySearchForm haveDefaultValue={isArchivePage} />;
      // case "Flights":
      //   return <FlightSearchForm haveDefaultValue={isArchivePage} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
