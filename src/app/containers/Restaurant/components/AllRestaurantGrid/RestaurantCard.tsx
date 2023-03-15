import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import { BiFoodTag } from 'react-icons/bi'

export interface RestaurantCardProps {
  className?: string;
  data?: StayDataType;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const RestaurantCard: FC<RestaurantCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    galleryImgs,
    listingCategory,
    address,
    title,
    href,
    like,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
  } = data;

  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full md:w-72 ">
        {/* <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={galleryImgs}
          uniqueID={`RestaurantCard_${id}`}
          href={href}
        /> */}
        <div className="aspect-w-4 aspect-h-3">
          <NcImage src={galleryImgs[0]}  />
        </div>
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col xl:mt-6 lg:mt-6">
        <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" />
        
        <div className="space-y-2">
          
          {/* <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              {listingCategory.name} in {address}
            </span>
          </div> */}
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{title}</span>
            </h2>
            {isAds && <Badge name="VEG" color="green" />}
          </div>
        </div>
        {/* <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Delicious Food
        </span>
        {/* {renderTienIch()} */}
        {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        <div className="flex justify-between items-end">
          <StartRating reviewCount={reviewCount} point={reviewStart} />
          <span className="text-base font-semibold border border-1 text-secondary-500 border-secondary-500 px-2 rounded-xl">
            {price}
            {` `}
            {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              /night
            </span> */}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-RestaurantCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="RestaurantCard"
    >
      <Link to={href} className="absolute inset-0"></Link>
      <div className="grid grid-cols-1 md:flex md:flex-row ">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default RestaurantCard;
