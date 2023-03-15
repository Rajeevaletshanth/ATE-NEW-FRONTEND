import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading from "components/Heading/Heading";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";
import RestaurantCard from "./RestaurantCard";

export interface SectionGridFilterCardAllRestaurantProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCardAllRestaurant: FC<SectionGridFilterCardAllRestaurantProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionGridFilterCardAllRestaurant ${className}`}
      data-nc-id="SectionGridFilterCardAllRestaurant"
    >
      <Heading
        children="Restaurants"
        isCenter={false}
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {data.map((stay) => (
          <RestaurantCard key={stay.id} data={stay} />
        ))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default SectionGridFilterCardAllRestaurant;
