import React, {useState, useEffect} from "react";
import SectionHero2 from "./components/SectionHero/SectionHero2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionSliderNewCategories from "./components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewCategoriesDifferentCard from "./components/SectionSliderNewCategories/SectionSliderNewCategoriesDifferentCard";
import "../../css/main.css"
import { Helmet } from "react-helmet";
//API
import { getTopBrandsApi, getAllRestaurantApi, getAllProductsApi, getAllCombosApi, getCuisinesApi, getTopOfferssApi } from 'services/apiServices'
import CardCategory1 from "components/StayCard/StayCard";
import SectionDowloadApp from "./components/SectionDowloadApp";


const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "New Yourk",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
];

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "KFC",
    desc:" Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Dominos",
    desc:" Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRRdK--jF8JStSkkQ48tU2BeklWAuwKAXiXN0Q8FRF-rmKO3SE-5QnxxYzG9HUc_zlFY&usqp=CAU",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "KFC",
    desc:" Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "1675391861810-Alexy_beautiful_restaurant_page_website_pizza_burger_noodles_ot_a2108342-ea7d-4c74-b8a5-e9e329a43116.png",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "KFC",
    desc:" Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "KFC",
    desc:" Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
  },
];

const OFFER_CAT : TaxonomyType[] = [
  {
    id: "1",
    href: "/offers",
    name: "Weekend Vibes",
    taxonomy: "category",
    thumbnail:
      "https://mypromo.azureedge.net/promotions/promo.lk-promo-b240e8f7897c4dc191e43abc4e628ee2.jpg",
  },
  {
    id: "2",
    href: "/offers",
    name: "Hot Deals",
    taxonomy: "category",
    thumbnail:
      "https://mypromo.azureedge.net/promotions/promo.lk-promo-141654aceb864defa773d1efec76903c.jpg",
  },
  {
    id: "3",
    href: "/offers",
    name: "Mix & Match",
    taxonomy: "category",
    thumbnail:
      "https://mypromo.azureedge.net/promotions/promo.lk-promo-61f7650f5ff9434b852fcc58c85928f1.jpg",
  },
  {
    id: "4",
    href: "/offers",
    name: "Hot Noodles",
    taxonomy: "category",
    thumbnail:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hot-noodles-ads-design-template-162c3e57dd65f39aeaa7b1f353840c94_screen.jpg?ts=1651049102",
  },
];

const Dashboard = () => {

  const [topBrands, setTopBrands] = useState<any>([]);
  const [topOffers, setTopOffers] = useState<any>([]);
  const [allRestaurants, setAllRestaurants] = useState<any>([]);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allCombo, setAllCombo] = useState<any>([]);
  const [allCuisines, setAllCuisines] = useState<any>([]);

  const getTopBrands = async() => {
      setTopBrands([])
      const response = await getTopBrandsApi();
      if(response.data.response === "success"){
        response.data.data.map((item: any,key: number) => {
          setTopBrands((s: any) => {
            return[
              ...s,{
                id: item.id,
                href: `/restaurant/${item.id}`,
                name: item.name,
                taxonomy: "category",
                thumbnail: item.avatar,
                desc: item.description
              }
            ]
          })
        })
      }
  }

  const getTopOffers = async() => {
    setTopOffers([])
    const response = await getTopOfferssApi();
    if(response.data.response === "success"){
      response.data.top_combo_menu.map((item: any,key: number) => {
        setTopOffers((s: any) => {
          return[
            ...s,{
              id: item.id,
              href: `/restaurant/${item.id}`,
              name: item.name,
              taxonomy: "category",
              thumbnail: item.avatar,
              type: "combo menu"
            }
          ]
        })
      })
      response.data.top_products.map((item: any,key: number) => {
        setTopOffers((s: any) => {
          return[
            ...s,{
              id: item.id,
              href: `/restaurant/${item.id}`,
              name: item.name,
              taxonomy: "category",
              thumbnail: item.avatar,
              type: "product"
            }
          ]
        })
      })
    }
  }

  const getAllProducts = async() => {
    setAllProducts([])
    const response = await getAllProductsApi();
    if(response.data.response === "success"){
      response.data.product.map((item: any,key: number) => {
        setAllProducts((s: any) => {
          return[
            ...s,{
              id: item.id,
              href: `/product/${item.id}`,
              name: item.name,
              desc: item.description,
              taxonomy: "category",
              thumbnail: item.avatar,
              price: item.price,
              category_id: item.category_id,
              restaurant_id: item.restaurant_id,
              vegetarian: item.vegetarian,
              addons: item.addons
            }
          ]
        })
      })
    }
  }

  const getAllCombo = async() => {
    setAllCombo([])
    const response = await getAllCombosApi();
    if(response.data.response === "success"){
      response.data.comboMenu.map((item: any,key: number) => {
        setAllCombo((s: any) => {
          return[
            ...s,{
              id: item.id,
              href: `/combo/${item.id}`,
              name: item.name,
              desc: item.description,
              taxonomy: "category",
              thumbnail: item.avatar,
              price: item.price,
              restaurant_id: item.restaurant_id
            }
          ]
        })
      })
    }
  }

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

  const getAllCuisines = async() => {
    setAllCuisines([])
    const response = await getCuisinesApi();
    if(response.data.response === "success"){
      response.data.cuisines.map((item: any,key: number) => {
        setAllCuisines((s: any) => {
          return[
            ...s,{
              id: item.id,
              href: `/cuisines/${item.id}`,
              name: item.name,
              taxonomy: "tag",
              thumbnail: item.avatar
            }
          ]
        })
      })
    }
  }

  useEffect(() => {
    getTopBrands();
    getTopOffers();
    getAllProducts();
    getAllCombo();
    getAllRestaurant();
    getAllCuisines();
  },[])

  return (
    <div className="nc-PageHome relative overflow-hidden ">
      <Helmet>
        <title>ATE - AnyTimeEat</title>
      </Helmet>

      {/* <BgGlassmorphism /> */}
      <SectionHero2 className="pt-10 lg:pt-16 lg:pb-16" />
        {/* Top Brands */}
        {topBrands?.length > 0? 
        <div className="container relative space-y-24 mb-24 mt-4 lg:mt-24 lg:space-y-28 lg:mb-28">
          <SectionSliderNewCategories 
            categories={topBrands}
            categoryCardType="card2"
            itemPerRow={4}
            heading="Top Brands"
            subHeading=""
            sliderStyle="none"
            uniqueClassName="PageHome_s2"
          />
        </div>:<></>}

        {/* Top Offers */}
        <div className="pt-1 pb-1 bg-gray-100 dark:bg-neutral-800 ">
            <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
                    <SectionSliderNewCategories 
                        categories={OFFER_CAT}
                        categoryCardType="card5"
                        itemPerRow={4}
                        heading="Top Offers"
                        subHeading="Good food is always cooking! Go ahead, order some yummy items from the menu"
                        sliderStyle="style2"
                        uniqueClassName="PageHome_s2"
                    />
            </div>
        </div>

        {/* All Products */}
        {allProducts?.length > 0? 
        <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
                    <SectionSliderNewCategoriesDifferentCard 
                        categories={allProducts}
                        itemPerRow={4}
                        heading="All Restaurant Menu"
                        subHeading="Good food is always cooking! Go ahead, order some yummy items from the menu"
                        sliderStyle="style2"
                        uniqueClassName="PageHome_s2"
                    />
        </div>:<></>}

        {/* All Combo Menu */}
        {allCombo?.length > 0? 
        <div className="pt-1 pb-1 bg-gray-100 dark:bg-neutral-800 ">
          <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
                      <SectionSliderNewCategoriesDifferentCard 
                          categories={allCombo}
                          itemPerRow={4}
                          heading="All Combo Menu"
                          subHeading="Good food is always cooking! Go ahead, order some yummy items from the menu"
                          sliderStyle="style2"
                          uniqueClassName="PageHome_s2"
                      />
          </div>
        </div>:<></>}

        {/* All Restaurants */}
        {allRestaurants?.length > 0? 
        <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
          <SectionSliderNewCategories 
            categories={allRestaurants}
            categoryCardType="card7"
            itemPerRow={5}
            heading="All Restaurants"
            subHeading="Good food is always cooking! Go ahead, order some yummy items from the menu"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div>
         :<></>}

        {/* Mobile App */}
        <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28 p-8">
          <SectionDowloadApp />
        </div>

        {/* All Cuisines */}
        {allCuisines?.length > 0? 
        <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
          <SectionSliderNewCategories 
            categories={allCuisines}
            categoryCardType="card2"
            itemPerRow={5}
            heading="Popular Cuisines"
            subHeading="Good food is always cooking! Go ahead, order some yummy items from the menu"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div>:<></>}
        
    </div>
  );
}

export default Dashboard;
