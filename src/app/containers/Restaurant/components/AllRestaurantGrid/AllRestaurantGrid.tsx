import { TaxonomyType } from "data/types";
import React, { FC, useEffect,useState } from "react";
import SectionGridFilterCardAllRestaurant from "./SectionGridFilterCardAllRestaurant";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

//Api
import { getAllRestaurantApi } from "services/apiServices";


export interface AllRestaurantGridProps {
  className?: string;
}

const AllRestaurantGrid: FC<AllRestaurantGridProps> = ({
  className = "",
}) => {
  const [allRestaurants, setAllRestaurants] = useState<any>([]);


  const getAllRestaurant = async() => {
    setAllRestaurants([])
    const response = await getAllRestaurantApi();
    if(response.data.response === "success"){
        setAllRestaurants(response.data.restaurant)
    }
  } 

  useEffect(() => {  
      getAllRestaurant();
  },[])

  // const []

  return (
    <div
      className={`nc-AllRestaurantGrid relative overflow-hidden ${className}`}
      data-nc-id="AllRestaurantGrid"
      style={{minHeight:"500px"}}
    >
      <Helmet>
        <title>ATE - Restaurants</title>
      </Helmet>

      <div className="container relative">

        {/* SECTION */}
        <SectionGridFilterCardAllRestaurant
          className="py-8 lg:py-8" 
          data={allRestaurants}
        />

      </div>
    </div>
  );
};

export default AllRestaurantGrid;
