import React, { FC, Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonThird from "shared/Button/ButtonThird";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import convertNumbThousand from "utils/convertNumbThousand";
import { Link } from "react-router-dom";
import Button from "shared/Button/Button";

// DEMO DATA
const list = [
  {
    name: "Entire place",
    description: "Have a place to yourself",
  },
  {
    name: "Private room",
    description: "Have your own room and share some common spaces",
  },
  {
    name: "Hotel room",
    description:
      "Have a private or shared room in a boutique hotel, hostel, and more",
  },
  {
    name: "Shared room",
    description: "Stay in a shared space, like a common room",
  },
];

const typeList = [
  {
    name: "product",
    label: "Products",
  },
  {
    name: "combo",
    label: "Combo Menu",
  },
];

export interface TabFiltersProps { 
  categoryList?: any[];
  selectedItem: string;
  selectedType: string;
  setSelectedType:(type:any) => void
  handleSelected:(item:any) => void
}

const TabFilters: FC<TabFiltersProps> = ({ categoryList = list, selectedType, selectedItem, setSelectedType, handleSelected  }) => {
  
  const renderCategoryList = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Category : <span className="text-primary-400">{selectedItem}</span></span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-3 left-0 sm:px-0 lg:max-w-xs">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {categoryList.map((item) => (
                      <div key={item.id} className="" onClick={(e) => handleSelected(item)}>
                        <Button onClick={close} className="flex items-left rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate" >
                          {item.name}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderType = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>{selectedType}</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-3 left-0 sm:px-0 lg:max-w-xs">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {typeList.map((item) => (
                      <div key={item.name} className="" onClick={(e) => setSelectedType(item)}>
                        <Button onClick={close} className="flex items-left rounded-md w-full px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate" >
                          {item.label}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };


  return (
    <div className="lg:flex sm:flex space-y-4 lg:space-y-0 sm:lg-y-0 lg:space-x-4 sm:space-x-4">
        {renderType()}
        {renderCategoryList()}
    </div>
  );
};

export default TabFilters;
