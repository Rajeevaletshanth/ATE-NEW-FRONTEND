import React, { FC } from "react";
import { Helmet } from "react-helmet";
import AllRestaurantGrid from "./components/AllRestaurantGrid/AllRestaurantGrid";


export interface AllRestaurantProps {
  className?: string;
}

const AllRestaurant: FC<AllRestaurantProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-AllRestaurant relative ${className}`}
      data-nc-id="AllRestaurant"
    >
      <Helmet>
        <title>All-Restaurant</title>
      </Helmet>
      
   
      

      {/* SECTION */}
      {/* <div className="  space-y-5 mb-5 mt-5 lg:space-y-5 lg:mb-5"> */}
        <AllRestaurantGrid />
      {/* </div> */}
    </div>
  );
};

export default AllRestaurant;
