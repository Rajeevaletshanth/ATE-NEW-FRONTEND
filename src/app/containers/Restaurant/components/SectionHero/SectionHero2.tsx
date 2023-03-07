import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "../../components/HeroSearchForm/HeroSearchForm";
import NcImage from "shared/NcImage/NcImage";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className} bg-gray-200 dark:bg-gray-900`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row px-20 ">
        <div className="flex-shrink-0  flex flex-row  space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0  ">  

        {/* <div className="w-30 h-30"> */}
        <NcImage src="https://cdn.dribbble.com/users/4532782/screenshots/17236723/media/a9169af73449a014087ef52f17a7e6db.png?compress=1&resize=400x300" className="rounded-3xl drop-shadow-xl"/>
        {/* </div>     */}
          <h2 className="font-medium text-2xl md:text-4xl xl:text-5xl !leading-[114%] text-gray-900 dark:text-gray-100">
            Discover the best food & drink
          </h2>
          {/* <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Accompanying us, you have a trip full of experiences. With Chisfis, booking accommodation, resort villas, hotels
          </span> */}
          {/* <ButtonPrimary>Start your search</ButtonPrimary> */}
        </div>
        {/* <div className="flex-grow">
          <img className="w-full" src={imagePng} alt="hero" />
        </div> */}
      </div>

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-60  items-center">
        {/* <HeroSearchForm /> */}
      </div>
    </div>
  );
};

export default SectionHero;
