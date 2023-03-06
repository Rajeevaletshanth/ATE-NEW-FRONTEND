// import SectionHero from "components/SectionHero/SectionHero";
import SectionHero2 from "../../components/SectionHero/SectionHero2"
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";

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
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
];

function Dashboard() {
  return (
    <div className="nc-PageHome relative overflow-hidden ">
      <BgGlassmorphism />
      <SectionHero2 className="pt-10 lg:pt-16 lg:pb-16" />
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          categories={DEMO_CATS}
          uniqueClassName="PageHome_s1"
        />

        {/* SECTION2 */}
        <SectionOurFeatures />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
        </div>

        {/* SECTION */}
        <SectionHowItWork />

        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        {/* SECTION */}
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        />


        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
