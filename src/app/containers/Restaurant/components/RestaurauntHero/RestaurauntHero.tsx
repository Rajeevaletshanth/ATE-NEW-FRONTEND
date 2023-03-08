import React, { FC, ReactNode } from "react";
import img from "../../../../images/bbq.png";
import HeroSearchForm, {
    SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";
import Heading from "components/Heading/Heading";
import StartRating from "components/StartRating/StartRating";

export interface RestaurauntHeroProps {
    className?: string;
}

const RestaurauntHero: FC<RestaurauntHeroProps> = ({
    className = "",
    
    
}) => {
    return (
        <div
            className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
            data-nc-id="SectionHeroArchivePage"
        >
            <div className="flex flex-col lg:flex-row lg:items-center">
                {/* <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            Tokyo, Jappan
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            <i className="text-2xl las la-map-marked"></i>
            <span className="ml-2.5">Jappan </span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 properties</span>
              </>
            )}
          </div>
        </div> */}
                <div className="container px-5 py-10 mx-auto ">
                    <div className="p-5 flex items-center mx-auto bg-white dark:bg-slate-800 mb-1 rounded-lg sm:flex-row flex-col shadow-lg">
                        <div className="sm:w-48 sm:h-48 h-50 w-50 sm:mr-10 inline-flex items-center justify-center flex-shrink-1">
                            <img
                                src={img}
                                className="border-round-lg rounded"
                            />
                            {/* <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src={img}  loading="lazy"/> */}
                        </div>
                        <div className="flex-grow sm:text-left text-center mt-1 sm:mt-0">
                            {/* <h1 className="text-black text-2xl title-font font-bold mb-2">Mc'Donalds</h1> */}
                            <Heading
                                children= "{data.name}"
                                desc= "{data.description}"
                                className="text-black dark:text-white"
                            />
                            <p className="text-black dark:text-white">address</p>
                            <StartRating
                                className="mt-4"
                            />


                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default RestaurauntHero;
