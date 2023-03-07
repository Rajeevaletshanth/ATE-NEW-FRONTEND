import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType, ProductsType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import Button from "shared/Button/Button";

export interface StayCardProps {
  className?: string;
  data?: StayDataType;
  size?: "default" | "small";
  card_data: ProductsType;
}

const DEMO_CAT: ProductsType = 
  {
    id: "1",
    href: "/listing-stay",
    name: "New Yourk",
    desc: "Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  }
;

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
  card_data = DEMO_CAT
}) => {
  const {
    id,
    href,
    name,
    desc,
    taxonomy,
    thumbnail,
    price,
    category_id,
    restaurant_id,
    vegetarian,
    addons
  } = card_data
// console.log(card_data)
  const renderSliderGallery = () => {
    return (
      <div className=" w-full">
        {/* <GallerySlider
          uniqueID={`${id}`}
          ratioClass="aspect-w-4 aspect-h-4 "
          galleryImgs={[`${thumbnail}`,`${thumbnail}`]}
          href={href}
        /> */}
        <div className="aspect-w-1 aspect-h-1">
        <NcImage src={thumbnail}  />
        </div>
        
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          {/* <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {listingCategory.name} · {bedrooms} beds
          </span> */}
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
          
          {/* <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{address}</span>
          </div> */}
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ${price}
            {/* {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )} */}
          </span>
          {/* {!!reviewStart && ( */}
            <StartRating reviewCount={120} point={4.5} />
          {/* // )} */}
        </div>
        <div className="flex justify-center">
            <Button className="bg-red-400 text-gray-100 hover:bg-red-600" fontSize="text-xs sm:text-sm font-small" sizeClass="px-2 py-1 sm:px-3">Order Now</Button>
        </div>

      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link to={href}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;
