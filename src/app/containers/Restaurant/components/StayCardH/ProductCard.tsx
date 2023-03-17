import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import { BiFoodTag } from 'react-icons/bi'
import Button from "shared/Button/Button";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import AddToCart from "components/AddToCart/AddToCart";

export interface ProductCardProps {
  className?: string;
  data: any;
}


const ProductCard: FC<ProductCardProps> = ({
  className = "",
  data
}) => {
  const {
    thumbnail,
    name,
    href,
    vegetarian,
    price,
    id,
    restaurant_id,
    addons,
    desc,
    type
  } = data;

 
  const addToCartData = {
      id: id,
      type: type,
      name: name,
      restaurant_id: restaurant_id,
      available_addons: addons,
      vegetarian: vegetarian,
      avatar: thumbnail,
      price: price,
      description: desc
  }

  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full md:w-72 ">
        <div className="aspect-w-4 aspect-h-3">
          <NcImage src={thumbnail}  />
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
            {vegetarian && <Badge name="VEG" color="green" />}
          </div>
        </div>
        {/* <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Delicious Food
        </span>
        {/* {renderTienIch()} */}
        {/* <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div> */}
        <div className="flex justify-between items-end">
          <StartRating reviewCount={4.5} point={112} />
          <span className="text-lg font-semibold border border-1 text-secondary-500 border-secondary-500 px-2 rounded-xl">
            € {price}
          </span>
        </div>
        <div className="flex  mt-4">
          <AddToCart data={addToCartData} />
            {/* <Button className="bg-primary-400 text-gray-100 hover:bg-primary-500 rounded-lg" fontSize="text-sm sm:text-sm font-medium" sizeClass="px-14 py-3 sm:px-14" onClick={addProductToCart}>Add to Cart</Button> */}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="StayCardH"
    >
      {/* <Link to={href} className="absolute inset-0"></Link> */}
      <div className="grid grid-cols-1 md:flex md:flex-row ">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductCard;
