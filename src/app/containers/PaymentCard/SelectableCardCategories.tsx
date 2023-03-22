import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import visa from 'images/cards/visa.jpg'
import amex from 'images/cards/amex.jpg'
import master from 'images/cards/master.jpg'
import discover from 'images/cards/discover.jpg'
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {HiOutlineCheck} from 'react-icons/hi'

export interface SelectableCardCategoriesProps {
  className?: string;
  taxonomy: any;
  size?: "large" | "normal";
  selectedCard: string;
  setSelectedCard(payment_method_id:string): void;
}

const SelectableCardCategories: FC<SelectableCardCategoriesProps> = ({
  className = "",
  size = "normal",
  taxonomy,
  selectedCard,
  setSelectedCard
}) => {

  const { count, card_holder_name, payment_method_id, card_id, card_type, last_four_digits, exp_month, exp_year, thumbnail } = taxonomy;

  return (
    <Link
      to=""
      className={`nc-SelectableCardCategories1 flex items-center bg-gray-100 dark:bg-gray-800 ${className}  ${selectedCard === payment_method_id && "border border-primary-500" }`}
      data-nc-id="CardCategory1"
      onClick={() => setSelectedCard(payment_method_id)}
    >
      <NcImage
        containerClassName={`flex-shrink-0 ${
          size === "large" ? "w-24 h-20" : "w-18 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={card_type === "visa"? visa : card_type === "mastercard"? master : card_type === "amex"? amex : discover}
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          •••• •••• •••• {last_four_digits}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          VALID TILL {exp_month}/{exp_year}
        </span>
      </div>
      {selectedCard === payment_method_id && <button className="ml-auto flex-shrink-0 bg-primary-500 text-white rounded-full p-2">
        <HiOutlineCheck size={15} />
      </button>}
    </Link>
  );
};

export default SelectableCardCategories;
