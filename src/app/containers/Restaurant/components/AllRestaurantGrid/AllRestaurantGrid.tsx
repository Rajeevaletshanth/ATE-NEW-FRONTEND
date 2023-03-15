import { TaxonomyType } from "data/types";
import React, { FC, useEffect,useState } from "react";
import SectionGridFilterCardAllRestaurant from "./SectionGridFilterCardAllRestaurant";
import { Helmet } from "react-helmet";
//Api
import { getAllRestaurantApi } from "services/apiServices";


export interface AllRestaurantGridProps {
  className?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Enjoy the Beauty of Brazil ",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "2",
    href: "#",
    name: "Enjoy the Beauty of Paris",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/2412609/pexels-photo-2412609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "3",
    href: "#",
    name: "Enjoy the Beauty of Bangkok",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://images.pexels.com/photos/732895/pexels-photo-732895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "5",
    href: "#",
    name: "Enjoy the Beauty of Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "4",
    href: "#",
    name: "Enjoy the Beauty of Seoul",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
];

const AllRestaurantGrid: FC<AllRestaurantGridProps> = ({
  className = "",
}) => {

  const [allRestaurants, setAllRestaurants] = useState<any>([]);

  const getAllRestaurant = async() => {
    setAllRestaurants([])
    const response = await getAllRestaurantApi();
    if(response.data.response === "success"){
      response.data.restaurant.map((item: any,key: number) => {
        setAllRestaurants((s: any) => {
          return[
            ...s,{
              id: item.id,
              href: `/restaurant/${item.id}`,
              name: item.name,
              desc: item.description,
              taxonomy: "category",
              thumbnail: item.avatar
            }
          ]
        })
      })
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
    >
      <Helmet>
        <title>ATE - Restaurants</title>
      </Helmet>

      <div className="container relative">

        {/* SECTION */}
        <SectionGridFilterCardAllRestaurant
          
          className="py-8 lg:py-8" 
        />

      </div>
    </div>
  );
};

export default AllRestaurantGrid;
