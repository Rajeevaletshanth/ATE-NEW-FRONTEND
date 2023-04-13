import React, { FC, useEffect, useState } from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridHasMap from "./SectionGridHasMap";
import RestaurantProducts from "./RestaurantProducts";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import RestaurantHero from "./components/RestaurantHero/RestaurantHero";

import { useDispatch, useSelector } from "react-redux";
import { addAllRestaurants, addAllProducts, addAllCombo, addAllCuisine, addTopOffer, addTopBrands } from "store/restaurant/itemsSlice";

import {
  getAllProductsApi,
  getAllCombosApi,
  getCategoriesApi,
  getRestaurantApi
} from "services/apiServices";


export interface ListingStayMapPageProps {
  className?: string;
}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({
  className = "",
}) => {
  const { id } = useParams();

  const [restaurantData, setRestaurantData] = useState<any>({})
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allCombo, setAllCombo] = useState<any>([]);
  const [allCategory, setAllCategory] = useState<any>([]);

  const dispatch = useDispatch();

  const { productList, comboList } = useSelector((state: any) => state.restaurant.items);


  const getRestaurant = async () => {
    setRestaurantData({});
    const response = await getRestaurantApi(id);
    if (response.data.response === "success") {
      let data = response.data.restaurant[0];
      setRestaurantData({
        id: data.id,
        name: data.name,
        email: data.email,
        phone_no: data.phone_no,
        description: data.description,
        avatar: data.avatar
      })
    }
  }

  const getAllProducts = async () => {
    setAllProducts([]);
    let data = [];
    if (productList?.length > 0) {
      data = productList;
    } else {
      const response = await getAllProductsApi();
      if (response.data.response === "success") {
        dispatch(addAllProducts(response.data.product));
        data = response.data.product;
      }
    }

      data.map((item: any, key: number) => {
        if(item.restaurant_id == id){
          setAllProducts((s: any) => {
            return [
              ...s,
              {
                id: item.id,
                type: "product",
                href: `/product/${item.id}`,
                name: item.name,
                desc: item.description,
                taxonomy: "category",
                thumbnail: item.avatar,
                price: item.price,
                category_id: item.category_id,
                restaurant_id: item.restaurant_id,
                vegetarian: item.vegetarian,
                addons: item.addons,
              },
            ];
          });
        }
      });
    
  };

  const getAllCombo = async () => {
    setAllCombo([]);
    let data = [];
    if (comboList?.length > 0) {
      data = comboList;
    } else {
      const response = await getAllCombosApi();
      if (response.data.response === "success") {
        dispatch(addAllCombo(response.data.comboMenu));
        data = response.data.comboMenu;
      }
    }

      data.map((item: any, key: number) => {
        if(item.restaurant_id == id){
          setAllCombo((s: any) => {
            return [
              ...s,
              {
                id: item.id,
                type: "combo",
                href: `/combo?id=${item.id}`,
                name: item.name,
                desc: item.description,
                taxonomy: "category",
                thumbnail: item.avatar,
                price: item.price,
                restaurant_id: item.restaurant_id,
              },
            ];
          });
        }
      });
    
  };

  const getAllCategories = async () => {
    setAllCategory([{id: -1, name: "All Category"}]);
    const response = await getCategoriesApi(id);
    
    if (response.data.response === "success") {
      response.data.category.map((item: any, key: number) => {
        if(item.restaurant_id == id){
          setAllCategory((s: any) => {
            return [
              ...s,
              {
                id: item.id,
                name: item.name,
                desc: item.description,
                // thumbnail: item.avatar,
                // restaurant_id: item.restaurant_id,
              },
            ];
          });
        }
      });
    }
  }

  useEffect(() => {
    getRestaurant();
    getAllProducts();
    getAllCombo();
    getAllCategories();
  }, []);
  return (
    <div
      className={`nc-ListingStayMapPage relative ${className}`}
      data-nc-id="ListingStayMapPage"
    >
      {Object.keys(restaurantData).length > 0 ? <>
        <Helmet>
          <title>{`Restaurant - ${restaurantData?.name}`}</title>
        </Helmet>
        
        {/* <BgGlassmorphism /> */}

        {/* SECTION HERO */}
        <div className="container relative space-y-5 mb-5 mt-5 lg:space-y-5 lg:mb-5">
          <RestaurantHero data={restaurantData}/>
          
        </div>
        

        {/* SECTION */}
        <div className="container relative space-y-5 mb-5 mt-5 lg:space-y-5 lg:mb-5">
          <RestaurantProducts allProducts={allProducts} allCombo={allCombo} categoryList={allCategory} restaurant_id={Number(id)} restaurantData={restaurantData}/>
        </div>
        </>
        : 
        <>
        <Helmet>
          <title>Restaurant Not Found</title>
        </Helmet>
      </>
      }
    </div>
  );
};

export default ListingStayMapPage;
