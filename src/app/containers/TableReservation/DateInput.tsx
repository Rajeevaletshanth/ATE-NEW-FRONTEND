import React, { useEffect, useState } from "react";
import { SingleDatePicker, AnchorDirectionShape } from "react-dates";
import { FC } from "react";
import moment from "moment";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";

export interface DateInputProps {
  defaultValue: moment.Moment | null;
  onChange?: (date: moment.Moment | null) => void;
  defaultFocus?: boolean;
  fieldClassName?: string;
  onFocusChange?: (focused: boolean) => void;
  className?: string;
  anchorDirection?: AnchorDirectionShape;
}

const DateInput: FC<DateInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = false,
  onFocusChange,
  anchorDirection,
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [startDate, setStartDate] = useState(defaultValue);
  const startDateId = useNcId();

  const windowSize = useWindowSize();

  useEffect(() => {
    setStartDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  const handleDateFocusChange = (arg: { focused: boolean }) => {
    setFocusedInput(arg.focused);
    onFocusChange && onFocusChange(arg.focused);
  };

  const renderInputCheckInDate = () => {
    const focused = focusedInput;
    return (
      <div
        className={`flex-1 flex relative ${fieldClassName} rounded-xl items-center  space-x-4 p-3 pl-8 cursor-pointer border dark:border-neutral-800 ${
          focused ? " bg-neutral-100 dark:bg-neutral-700" : "bg-neutral-50 dark:bg-neutral-800"
        }`}
        // nc-hero-field-focused 
      >
        <div className="text-neutral-600 dark:text-neutral-400 cursor-pointer">
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="flex-grow text-left ">
        <span className="block mt-1 text-sm text-primary-500 leading-none font-medium">
            {startDate ? "Date" : `Choose Date`}
          </span>
          <span className="block xl:text-lg font-semibold">
            {startDate ? startDate.format("DD MMM YYYY") : "Date"}
          </span>
          
        </div>
      </div>
    );
  };

  return (
    <div
      className={`ExperiencesDateSingleInput relative flex ${className} ${
        !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="absolute inset-0 flex ">
        <SingleDatePicker
          date={startDate}
          onDateChange={(date) => {
            setStartDate(date);
            onChange && onChange(date);
          }}
          id={startDateId}
          focused={focusedInput}
          daySize={windowSize.width > 1279 ? 56 : 44}
          orientation={"horizontal"}
          onFocusChange={handleDateFocusChange}
          noBorder
          hideKeyboardShortcutsPanel
          numberOfMonths={1}
          anchorDirection={anchorDirection}
          showClearDate
          reopenPickerOnClearDate
        />
      </div>

      {renderInputCheckInDate()}
    </div>
  );
};

export default DateInput;
