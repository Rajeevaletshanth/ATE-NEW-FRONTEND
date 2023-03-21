import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import visa from 'images/cards/visa.jpg'
import amex from 'images/cards/amex.jpg'
import master from 'images/cards/master.jpg'
import discover from 'images/cards/discover.jpg'
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {RiDeleteBin6Line} from 'react-icons/ri'

export interface CardCategoryProps {
  className?: string;
  taxonomy: any;
  size?: "large" | "normal";
  removeCard(card_id:string): void;
}

const CardCategory: FC<CardCategoryProps> = ({
  className = "",
  size = "normal",
  taxonomy,
  removeCard
}) => {

  const { count, card_holder_name, card_id, card_type, last_four_digits, exp_month, exp_year, thumbnail } = taxonomy;

  return (
    <Link
      to=""
      className={`nc-CardCategory1 flex items-center bg-gray-200 dark:bg-gray-700 ${className}`}
      data-nc-id="CardCategory1"
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
      <button className="ml-auto flex-shrink-0 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 text-white rounded-full p-2">
        {/* <i className="fas fa-trash"></i> */}
        <RiDeleteBin6Line size={23} onClick={() => removeCard(card_id)}/>
      </button>
      {/* <div className="ml-auto flex-shrink-0">
        <span>Delete</span>
      </div> */}
    </Link>
  );
};

export default CardCategory;
