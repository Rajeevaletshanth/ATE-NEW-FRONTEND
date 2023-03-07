import React, { FC, useEffect, useMemo } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { TaxonomyType, ProductsType } from "data/types";
import CardCategory3 from "components/CardCategory3/CardCategory3";
import CardCategory4 from "components/CardCategory4/CardCategory4";
import NextPrev from "shared/NextPrev/NextPrev";
import CardCategory5 from "components/CardCategory5/CardCategory5";
import CardCategoryBox1 from "../CardCategoryBox1/CardCategoryBox1";
import useNcId from "hooks/useNcId";
import StayCard from "./StayCard";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: ProductsType[];
  categoryCardType?: "card2" | "card3" | "card4" | "card5";
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  uniqueClassName: string;
}

const DEMO_CATS: ProductsType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "KFC",
    desc: "Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Dominos",
    desc: "Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWRRdK--jF8JStSkkQ48tU2BeklWAuwKAXiXN0Q8FRF-rmKO3SE-5QnxxYzG9HUc_zlFY&usqp=CAU",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "KFC",
    desc: "Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "1675391861810-Alexy_beautiful_restaurant_page_website_pizza_burger_noodles_ot_a2108342-ea7d-4c74-b8a5-e9e329a43116.png",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "KFC",
    desc: "Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "KFC",
    desc: "Finger lickin good",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1488265976/k2htrr9z4vsxkjbthskk.png",
  },
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = "Heading of sections",
  subHeading = "Descriptions for sections",
  className = "",
  itemClassName = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = "card2",
  sliderStyle = "style1",
  uniqueClassName
}) => {
  const UNIQUE_CLASS =
    "SectionSliderNewCategories__" + uniqueClassName + useNcId();

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 20,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  const renderCard = (item: ProductsType, index: number) => {
    return <StayCard card_data={item}/>
  };

  return (
    <div className={`nc-SectionSliderNewCategories  ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === "style1"}
          isCenter={sliderStyle === "style2"}
        >
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides py-6">
            {categories.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                {renderCard(item, index)}
              </li>
            ))}
          </ul>
        </div>

        {sliderStyle === "style2" && (
          <NextPrev className="justify-center mt-16" />
        )}
      </div>
    </div>
  );
};

export default SectionSliderNewCategories;
