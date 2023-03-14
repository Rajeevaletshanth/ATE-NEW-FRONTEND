import React, { FC, useState } from "react";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import StayCardH from "./components/StayCardH/StayCardH";
import GoogleMapReact from "google-map-react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Checkbox from "shared/Checkbox/Checkbox";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading from "components/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NumberInput from "./components/NumberInput/NumberInput";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";



const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12);

export interface SectionGridHasMapProps { }

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* CARDSSSS */}
        <div className="min-h-screen w-full xl:w-[780px] 2xl:w-[800px] flex-shrink-0 xl:px-8 ">
          <Heading children="Recommended" desc="24 items" />
          <div className="mb-4 lg:mb-4">
            <TabFilters />
          </div>

          <div className="grid grid-cols-1 gap-8">
            {DEMO_STAYS.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID((_) => item.id)}
                onMouseLeave={() => setCurrentHoverID((_) => -1)}
              >
                <StayCardH data={item} />
              </div>
            ))}
          </div>
          {/* <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div> */}
        </div>

        {/* MAPPPPP */}
        <div
          className={`xl:flex-grow xl:static xl:block w-full ${showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
            }`}
        >

          <div className="fixed xl:sticky top-10 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
              <span className=" font-semibold text-3xl">Cart</span>
              <div>
                <h3 className="font-semibold">McDonalds</h3>
                <p className=" text-xs">American FastFood</p>
              </div>
              {/* <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 w-full sm:w-40">
                  <div >
                    <img className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden" src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                  </div>
                </div>
                <div className="py-5 sm:px-5 space-y-3">
                  <div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      Hotel room in Tokyo, Jappan
                    </span>
                    <span className="text-base font-medium mt-1 block">
                      The Lounge & Bar
                    </span>
                  </div>
                  <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                    2 beds · 2 baths
                  </span>
                  <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                  <StartRating />
                </div>
              </div> */}
              <div className="flex w-full space-x-2 sm:space-x-4 mb-3">
                <img className="flex-shrink-0 object-cover  w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" loading="lazy" />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">name</h3>
                      <p className="text-sm dark:text-gray-400"> 03</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">24 €</p>
                      {/* <p className="text-sm line-through dark:text-gray-600">75.50€</p> */}
                      <NumberInput className="py-5" />
                    </div>
                    {/* <div className="text-center">
                      <NumberInput />
                    </div> */}
                  </div>

                </div>
              </div>
              <div className="flex w-full space-x-2 sm:space-x-4 mb-3">
                <img className="flex-shrink-0 object-cover  w-20 h-20 dark:border-transparent rounded outline-none sm:w-20 sm:h-20 dark:bg-gray-500" src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" loading="lazy" />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">name</h3>
                      <p className="text-sm dark:text-gray-400"> 03</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">24 €</p>
                      {/* <p className="text-sm line-through dark:text-gray-600">75.50€</p> */}
                      <NumberInput className="py-5" />
                    </div>
                    {/* <div className="text-center">
                      <NumberInput />
                    </div> */}
                  </div>

                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex justify-between font-semibold">
                  <h3 className="text-2xl font-semibold">Sub Total</h3>
                  <span>$57</span>
                </div>
              </div>
              <div
                className={`bg-red-600 dark:bg-white/5 p-5 rounded-3xl  mt-10 `}
              >
                {/* ${items.length > 0
                    ? "pointer-events-auto "
                    : "pointer-events-none "
                  }  */}
                <a
                  className={`flex items-center justify-center w-full px-4 py-0 !rounded-xl text-sm font-medium `}
                  href="/checkout"
                  rel="noopener noreferrer"
                >
                  {/* ${items.length > 0
                      ? "bg-red-600 text-white hover:bg-red-800"
                      : "bg-red-900 text-white "
                    } */}
                  <ShoppingBagIcon className="w-4 h-4" />
                  <span className="ml-2 font-extrabold">CheckOut</span>
                </a>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
