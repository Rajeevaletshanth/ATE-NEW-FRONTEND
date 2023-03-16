import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-sm sm:text-base bg-neutral-100 p-2 rounded-xl ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white  dark:checked:bg-primary-500 focus:ring-primary-500"
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <label
          htmlFor={name}
          className=" flex flex-1 ml-2.5"
        >
          <span className=" text-neutral-900">
            {label}
          </span>
          {subLabel && (
            <p className="text-white px-2 mt-0.5 bg-green-500 rounded-lg text-sm  ml-auto">
              € {subLabel}
            </p>
          )}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
