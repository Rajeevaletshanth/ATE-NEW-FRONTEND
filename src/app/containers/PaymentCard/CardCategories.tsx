import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import visa from 'images/cards/visa.jpg'
import amex from 'images/cards/amex.jpg'
import master from 'images/cards/master.jpg'
import discover from 'images/cards/discover.jpg'

export interface CardCategoryProps {
  className?: string;
  taxonomy: any;
  size?: "large" | "normal";
}

const CardCategory: FC<CardCategoryProps> = ({
  className = "",
  size = "normal",
  taxonomy,
}) => {
  const { count, card_holder_name, card_type, last_four_digits, href = "/", thumbnail } = taxonomy;
  const [type, setType] = useState<any>(visa)

  useEffect(() => {
    if(card_type === "visa"){
        setType(visa)
    }else if(card_type === "mastercard"){
        setType(master)
    }else if(card_type === "amex"){
        setType(amex)
    }else{
        setType(discover)
    }
  },[card_type])
  return (
    <Link
      to={href}
      className={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
      <NcImage
        containerClassName={`flex-shrink-0 ${
          size === "large" ? "w-24 h-20" : "w-18 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={type}
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          •••• •••• •••• {last_four_digits}
        </h2>
        {/* <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          •••• •••• •••• {last_four_digits}
        </span> */}
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          VALID TILL {count}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory;
