import Label from "components/Label/Label";
import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import FavouriteSliderNewCard from "./Components/FavouriteSliderNewCard/FavouriteSliderNewCard";

const Favourite = () => {
  return (
    <div>
      <CommonLayout>
      <div className="pt-1 pb-1 bg-gray-100 dark:bg-neutral-800 ">
          <div className="container relative space-y-24 mb-24 mt-24 lg:space-y-28 lg:mb-28">
                      <FavouriteSliderNewCard 
                          // categories={allCombo}
                          itemPerRow={5}
                          heading="Favourites"
                          subHeading=""
                          sliderStyle="style1"
                          uniqueClassName="PageHome_s2"
                      />
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default Favourite;
