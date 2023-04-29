import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import CartDropdown from "./CartDropdown";
import AvatarDropdown from "./AvatarDropdown";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";
import { useSelector, useDispatch } from 'react-redux'

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {


  const { signedIn } = useSelector((state:any) => state.auth.session)
  const { username, avatar } = useSelector((state:any) => state.auth.user)

  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-0 lg:container py-0 lg:py-5 relative flex justify-between items-center">
        <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          <Logo />
          <Navigation />
        </div>

        {/* <div className="lg:hidden flex-row mx-auto items-center space-x-0.5">
          <HeroSearchForm2MobileFactory />
          <CartDropdown />
        </div> */}
        {/* <div className="md:hidden flex-[2] items-center justify-center lg:flex-none text-neutral-700 dark:text-neutral-100"> */}
          <div className="flex flex-row container md:hidden  items-center space-x-0.5 py-2 justify-between">
            {/* <HeroSearchForm2MobileFactory /> */}
            <div className="flex justify-start">
              <MenuBar iconClassName="h-7 w-7"/>
              {/* <Logo className="w-16 mt-2"/> */}
            </div>
            
            <div className="flex justify-end">
              {/* <SwitchDarkMode /> */}
              
              {signedIn && <span className="flex flex-row ml-2 mr-2 mt-2">
              <AvatarDropdown imgUrl={avatar}/>
              </span>}
              {!signedIn && 
                <div className="flex flex-col justify-center ml-2 mr-2"><ButtonPrimary className="px-3 py-1" href="/login">Login</ButtonPrimary></div>
              }
              <CartDropdown />
            </div>
            
          </div>
        {/* </div> */}

        <div className="md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex xl:flex items-center space-x-0.5">
            <SwitchDarkMode />
            {/* <SearchDropdown /> */}
            {/* <NotifyDropdown /> */}
            <CartDropdown />

            <div className="px-1" />
            {signedIn && <span className="flex flex-row">
            <AvatarDropdown imgUrl={avatar}/> <span className="mt-2 ml-2 text-sm">{username}</span>
            </span>}

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
