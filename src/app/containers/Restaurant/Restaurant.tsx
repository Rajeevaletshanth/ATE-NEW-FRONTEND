import React, {useState, useEffect} from "react";
import SectionHero2 from "./components/SectionHero/SectionHero2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionSliderNewCategories from "./components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewCategoriesDifferentCard from "./components/SectionSliderNewCategories/SectionSliderNewCategoriesDifferentCard";
import "../../css/main.css"



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
];

const Restaurant = () => {


  useEffect(() => {

  },[])

  return (
    <div className="nc-PageHome relative overflow-hidden ">
      <BgGlassmorphism />
      <SectionHero2 className="pt-10 lg:pt-16 lg:pb-16" />
        {/* hero Section */}
        {/* <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
          <SectionSliderNewCategories 
            categories={OFFER_CAT}
            categoryCardType="card2"
            itemPerRow={4}
            heading="Top Brands"
            subHeading=""
            sliderStyle="style1"
            uniqueClassName="PageHome_s2"
          />
        </div> */}
        {/* <div className="flex flex-col lg:flex-row ">
          <div className="w-full lg:w-2/6 bg-gray-200 container relative space-y-24 lg:space-y-28 lg:mb-28">
            svasvsvvsvdvsdvsdvsvsdvsdvsdv
            sav
            sav
            asv
            sdgs
          </div>
          <div className="w-full lg:w-4/6 bg-gray-300 container relative space-y-24 lg:space-y-28 lg:mb-28">3</div>
          <div className="w-full lg:w-2/6 bg-gray-400 container relative space-y-24 lg:space-y-28 lg:mb-28">2</div>
        </div> */}

        {/* <div className="flex flex-col lg:flex-row lg:h-screen">
          <div className="bg-gray-800 text-white flex-shrink-0 w-full lg:w-1/4">
          vasvsvvsvdvsdvsdvsvsdvsdvsdv
                    sav
                    sav
                    asv
                    sdgs
          </div>
          <div className="bg-gray-100 w-full lg:w-3/4">
            fjgfishfbis
          </div>
        </div> */}
    </div>
  );
}

export default Restaurant;
