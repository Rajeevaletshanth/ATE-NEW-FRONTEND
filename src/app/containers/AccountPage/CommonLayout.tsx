import React from "react";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import Authenticate from "../Authenticate/Authenticate";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
      <Authenticate />
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <div className="container">
          <div className="flex space-x-8 md:space-x-14 overflow-x-auto ">
            {/* hiddenScrollbar */}
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500 " : "border-transparent"
                }`
              }
            >
              Account info
            </NavLink>
            <NavLink
              to="/manage-address"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500 " : "border-transparent"
                }`
              }
            >
              Manage Address
            </NavLink>
            <NavLink
              to="/savelists"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500" : "border-transparent"
                }`
              }
            >
              Save lists
            </NavLink>
            <NavLink
              to="/password-settings"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500" : "border-transparent"
                }`
              }
            >
              Change password
            </NavLink>
            <NavLink
              to="/billing"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500" : "border-transparent"
                }`
              }
            >
              Change Billing
            </NavLink>

            <NavLink
              to="/myorders"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500 " : "border-transparent"
                }`
              }
            >
              My Orders
            </NavLink>

            <NavLink
              to="/favourite"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500" : "border-transparent"
                }`
              }
            >
              Favourites
            </NavLink>
            <NavLink
              to="/referal"
              className={({ isActive }) =>
                `block py-5 md:py-8 border-b-2 flex-shrink-0 ${
                  isActive ? "border-primary-500" : "border-transparent"
                }`
              }
            >
              Referal
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default CommonLayout;
