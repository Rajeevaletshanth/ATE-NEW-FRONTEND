import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO, MAIN_NAVIGATION } from "data/navigation";

function Navigation() {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {MAIN_NAVIGATION.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
