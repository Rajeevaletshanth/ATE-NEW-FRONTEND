import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import { useSelector, useDispatch } from 'react-redux'


export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {


  const { signedIn } = useSelector((state:any) => state.auth.session)

  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-0 lg:container py-0 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          <Logo />
          <Navigation />
        </div>

        <div className="lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex xl:flex items-center space-x-0.5">
            <SwitchDarkMode />
            {/* <SearchDropdown /> */}
            <NotifyDropdown />
            
            <div className="px-1" />
            {signedIn && <>
            <AvatarDropdown />
            </>}

            <div className="px-1" />
            {!signedIn && 
              <ButtonPrimary href="/login">Sign up</ButtonPrimary>
            }
            

          <div className="flex lg:hidden xl:hidden items-center">
            <div className="px-0.5" />
            {/* <Navigation /> */}
            <MenuBar />
          </div>
        </div>
    </div>
    </div>
    </div>
  );
};

export default MainNav1;
