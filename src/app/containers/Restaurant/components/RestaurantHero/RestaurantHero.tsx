import React, { FC, ReactNode } from "react";
import img from "../../../../images/bbq.png";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import Heading from "components/Heading/Heading";
import StartRating from "components/StartRating/StartRating";
import NcImage from "shared/NcImage/NcImage";
import { HiOutlineAtSymbol, HiPhone } from "react-icons/hi";

export interface RestaurantHeroProps {
  className?: string;
  data: any;
  point?: number;
  reviewCount?: number;
}

const RestaurantHero: FC<RestaurantHeroProps> = ({ className = "", data, point, reviewCount }) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="container px-0 py-4 mx-auto ">
          <div className="px-14 py-10 flex items-center  mx-auto bg-white dark:bg-slate-800 mb-1 rounded-2xl sm:flex-row flex-col shadow-2xl ">
            <div className=" sm:mr-10 inline-flex items-center justify-center flex-shrink-1">
              <NcImage
                src={data.avatar}
                className="border-round-lg rounded-2xl w-full h-full"
                style={{height:"200px", width:"200px"}}
              />
            </div>
            <div className="flex-grow sm:text-left text-center mt-1 sm:mt-2">
              <Heading
                children={data.name}
                desc={data.description}
                className="text-black dark:text-white mb-4"
                underline={false}
              />

              <div className="flex flex-row">
                <i className="mt-0.5 text-sm las la-envelope"></i>
                <span className="ml-2.5 text-sm">{data.email}</span>
              </div>
              <div className="flex flex-row">
                <i className="mt-0.5 text-sm las la-phone"></i>
                <span className="ml-2.5 text-sm">{data.phone_no}</span>
              </div>

              <StartRating className="mt-4" point={point} reviewCount={reviewCount}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
