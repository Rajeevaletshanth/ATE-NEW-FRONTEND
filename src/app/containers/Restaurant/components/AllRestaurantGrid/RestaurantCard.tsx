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
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface RestaurantCardProps {
  className?: string;
  data?: any;
}


const RestaurantCard: FC<RestaurantCardProps> = ({
  className = "",
  data
}) => {
  const {
    avatar,
    email,
    desc,
    href,
    phone_no,
    id,
    name
  } = data;

  const renderSliderGallery = () => {
    console.log(data)
    return (
      <div className="relative flex-shrink-0 w-full md:w-72 ">
        {/* <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={galleryImgs}
          uniqueID={`RestaurantCard_${id}`}
          href={href}
        /> */}
        <div className="aspect-w-4 aspect-h-3">
          <NcImage src={avatar}  />
        </div>
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col xl:mt-6 lg:mt-6">
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3" />
        
        <div className="space-y-2">
          
          {/* <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              {listingCategory.name} in {address}
            </span>
          </div> */}
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{name}</span>
            </h2>
            {/* {isAds && <Badge name="VEG" color="green" />} */}
          </div>
        </div>

              <div className="flex flex-row text-sm text-neutral-500 dark:text-neutral-400">
                <i className="mt-0.5 text-sm las la-envelope"></i>
                <span className="ml-2.5 text-sm">{data.email}</span>
              </div>
              <div className="flex flex-row text-sm text-neutral-500 dark:text-neutral-400">
                <i className="mt-0.5 text-sm las la-phone"></i>
                <span className="ml-2.5 text-sm">{data.phone_no}</span>
              </div>
              <StartRating className="mt-2" point={20} reviewCount={4.2}/>
              <div className="flex flex-grow justify-center space-x-2 mt-3">
                <Link to={`/restaurant/${data.id}`}>
                  <ButtonPrimary className="rounded-lg px-4 py-2 md:px-4 md:py-2">Order Now</ButtonPrimary>
                </Link>
                <Link to={`/reservation/${data.id}`}>
                  <ButtonSecondary className="rounded-lg px-4 py-2 md:px-4 md:py-2">Reserve Now</ButtonSecondary> 
                </Link>
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
