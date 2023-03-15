import React, { FC } from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridHasMap from "./SectionGridHasMap";
import { Helmet } from "react-helmet";
import RestaurantHero from "./components/RestaurantHero/RestaurantHero";

export interface ListingStayMapPageProps {
  className?: string;
}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-ListingStayMapPage relative ${className}`}
      data-nc-id="ListingStayMapPage"
    >
      <Helmet>
        <title>Restaurant - Barbeque Nation</title>
      </Helmet>
      
      {/* <BgGlassmorphism /> */}

      {/* SECTION HERO */}
      <div className="container relative space-y-5 mb-5 mt-5 lg:space-y-5 lg:mb-5">
        <RestaurantHero />
        
      </div>
      

      {/* SECTION */}
      <div className="container relative space-y-5 mb-5 mt-5 lg:space-y-5 lg:mb-5">
        <SectionGridHasMap />
      </div>
    </div>
  );
};

export default ListingStayMapPage;
