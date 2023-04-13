import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";

import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
// import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
// import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
// import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
// import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
// import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
// import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
// import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import CheckOutPage from "app/containers/CheckOutPage/CheckOutPage";
import PayPage from "app/containers/PayDonePage/PayPage";
// import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "app/containers/AccountPage/AccounPage";
import AccountPass from "app/containers/AccountPage/AccountPass";
import AccountSavelists from "app/containers/AccountPage/AccountSavelists";
import AccountBilling from "app/containers/AccountPage/AccountBilling";
import Favourite from "app/containers/AccountPage/Favourite";
import ManageAddress from "app/containers/AccountPage/ManageAddress";
import MyOrders from "app/containers/AccountPage/MyOrders";
import Referal from "app/containers/AccountPage/Referal";
// import PageContact from "containers/PageContact/PageContact";
// import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
// import PageSubcription from "containers/PageSubcription/PageSubcription";
// import BlogPage from "containers/BlogPage/BlogPage";
// import BlogSingle from "containers/BlogPage/BlogSingle";
// import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
// import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
// import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
// import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
// import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
// import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
// import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
// import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
// import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
// import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
// import PageHome2 from "containers/PageHome/PageHome2";
// import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
// import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
// import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
// import PageHome3 from "containers/PageHome/PageHome3";

import Dashboard from "app/containers/Dashboard/Dashboard";
import Restaurant from "app/containers/Restaurant/Restaurant";
import AllRestaurant from "app/containers/Restaurant/AllRestaurant";

import Chat from "app/containers/Chat/Chat";
import OrderTracker from "app/containers/OrderTracker/OrderTracker";
import TableReservation from "app/containers/TableReservation/TableReservation";

export const pages: Page[] = [
  { path: "/", exact: true, component: Dashboard },
  { path: "/#", exact: true, component: Dashboard },
  { path: "/restaurant", exact: true, component: AllRestaurant },
  { path: "/restaurant/:id", exact: false, component: Restaurant },
  { path: "/order-tracking", exact: false, component: OrderTracker },
  { path: "/reservation/:id", exact: false, component: TableReservation },
  { path: "/chat", exact: true, component: Chat },
  // { path: "/home-1-header-2", exact: true, component: PageHome },
  // { path: "/home-2", component: PageHome2 },
  // { path: "/home-3", component: PageHome3 },

  // { path: "/listing-stay", component: ListingStayPage },
  // { path: "/listing-stay-map", component: ListingStayMapPage },
  // { path: "/listing-stay-detail", component: ListingStayDetailPage },

  // {
  //   path: "/listing-experiences",
  //   component: ListingExperiencesPage,
  // },
  // {
  //   path: "/listing-experiences-map",
  //   component: ListingExperiencesMapPage,
  // },
  // {
  //   path: "/listing-experiences-detail",
  //   component: ListingExperiencesDetailPage,
  // },

  // { path: "/listing-car", component: ListingCarPage },
  // { path: "/listing-car-map", component: ListingCarMapPage },
  // { path: "/listing-car-detail", component: ListingCarDetailPage },

  // { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  // { path: "/listing-real-estate", component: ListingRealEstatePage },

  // { path: "/listing-flights", component: ListingFlightsPage },

  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  

  // { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/password-settings", component: AccountPass },
  { path: "/savelists", component: AccountSavelists },
  { path: "/billing", component: AccountBilling },
  {path: "/favourite", component: Favourite},
  {path: "/manage-address", component: ManageAddress},
  {path: "/myorders", component: MyOrders},
  {path: "/referal", component: Referal},



  // { path: "/blog", component: BlogPage },
  // { path: "/blog-single", component: BlogSingle },

  // { path: "/add-listing-1", component: PageAddListing1 },
  // { path: "/add-listing-2", component: PageAddListing2 },
  // { path: "/add-listing-3", component: PageAddListing3 },
  // { path: "/add-listing-4", component: PageAddListing4 },
  // { path: "/add-listing-5", component: PageAddListing5 },
  // { path: "/add-listing-6", component: PageAddListing6 },
  // { path: "/add-listing-7", component: PageAddListing7 },
  // { path: "/add-listing-8", component: PageAddListing8 },
  // { path: "/add-listing-9", component: PageAddListing9 },
  // { path: "/add-listing-10", component: PageAddListing10 },

  // { path: "/contact", component: PageContact },
  // { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  // { path: "/subscription", component: PageSubcription },

];

const MyRoutes = () => {
  const WIN_WIDTH = useWindowSize().width || window.innerWidth;
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "anytimeat" : ""}
    >
      <ScrollToTop />
      <SiteHeader />

      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return <Route key={path} element={<Component />} path={path} />;
        })}
        <Route element={<Page404 />} />
      </Routes>

      {WIN_WIDTH < 768 && <FooterNav />}
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
