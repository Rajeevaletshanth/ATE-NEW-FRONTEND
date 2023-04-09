import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import { PathName } from "routers/types";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { RiTimerLine } from 'react-icons/ri';

export interface TimeInputProps {
  defaultValue: any;
  onChange?: (data: any) => void;
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
  type?: string;
  isValid?: boolean;
}

const times = [
  "7:00 AM","7:30 AM",
  "8:00 AM","8:30 AM",
  "9:00 AM","9:30 AM",
  "10:00 AM","10:30 AM",
  "11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM",
  "1:00 PM","1:30 PM",
  "2:00 PM","2:30 PM",
  "3:00 PM","3:30 PM",
  "4:00 PM","4:30 PM",
  "5:00 PM","5:30 PM",
  "6:00 PM","6:30 PM",
  "7:00 PM","7:30 PM",
  "8:00 PM","8:30 PM",
  "9:00 PM","9:30 PM",
  "10:00 PM","10:30 PM",
  "11:00 PM","11:30 PM",
  "11:59 PM"
];


const TimeInput: FC<TimeInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "",
  className = "",
  hasButtonSubmit = true,
  type,
  isValid
}) => {

  const handleTimeInput = (item:any) => {
    // e.preventDefault()
    onChange && onChange(item)
  }
  

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex relative ${fieldClassName} rounded-xl items-center cursor-pointer space-x-4 p-3 pl-8 border dark:border-neutral-800 ${
              open ? " bg-neutral-100 dark:bg-neutral-700" : "bg-neutral-50 dark:bg-neutral-800"
            } ${!isValid && "border-primary-500 dark:border-primary-500" }`}
          >
            <Popover.Button
              className={`flex-1 flex text-left items-center ${fieldClassName} space-x-3 `}
              onClick={() => document.querySelector("html")?.click()}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="nc-icon-field"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="red"
                >
                  <RiTimerLine size={25} className="text-primary-500"/>
                  {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  /> */}
                </svg>
              </div>
              <div className="flex-grow text-left">
                <span className="block mt-1 text-xs md:text-sm text-primary-500 leading-none font-medium">
                  {defaultValue ? type : "Choose Time"}
                </span>
                <span className="block text-sm md:text-lg font-semibold">
                  {defaultValue}
                </span>
              </div>
            </Popover.Button>


          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl"
              
            >
              
              <div style={{maxHeight:"300px", overflowY:"scroll"}}>
              {times.map((item:any) => {
                    return(
                      <>
                        <div style={{cursor:"pointer"}} className="py-1 md:y-3 font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 w-full rounded-xl mb-1" onClick={() => handleTimeInput(item)}>{item}</div>
                      </>
                    )
                })}
              </div>

            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default TimeInput;
