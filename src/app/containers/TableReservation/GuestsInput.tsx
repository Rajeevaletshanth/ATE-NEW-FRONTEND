import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import { FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { PathName } from "routers/types";

export interface GuestsInputProps {
  defaultValue: GuestsObject;
  onChange?: (data: GuestsObject) => void;
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  fieldClassName = "",
  className = "",
  buttonSubmitHref = "/listing-stay-map",
  hasButtonSubmit = true,
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    defaultValue.guestAdults || 0
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    defaultValue.guestChildren || 0
  );

  useEffect(() => {
    setGuestAdultsInputValue(defaultValue.guestAdults || 0);
    setGuestChildrenInputValue(defaultValue.guestChildren || 0);
  }, [defaultValue]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    onChange && onChange(newValue);
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex relative ${fieldClassName} rounded-xl items-center cursor-pointer space-x-4 p-3 pl-8 border  dark:border-neutral-800 ${
              open ? " bg-neutral-100 dark:bg-neutral-700" : "bg-neutral-50 dark:bg-neutral-800"
            }`}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <div className="flex-grow text-left">
                <span className="block mt-1 text-sm text-primary-500 leading-none font-medium">
                  {totalGuests ? "Guests" : "Add guests"}
                </span>
                <span className="block xl:text-lg font-semibold">
                  {totalGuests || ""} Guests
                </span>
                
              </div>
            </Popover.Button>


            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                {/* <ButtonSubmit href={buttonSubmitHref} /> */}
              </div>
            )}
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
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value, "guestAdults")}
                max={10}
                min={1}
                label="Adults"
                // desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => handleChangeData(value, "guestChildren")}
                max={10}
                label="Children"
                // desc="Ages 2–12"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
