import React from "react";
import NavLogo from "../Navbar/NavLogo";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  interface menuItemObj {
    name: string;
    image: string;
    to: string;
  }
  const menuItemList: menuItemObj[] = [
    { name: "Shadow", image: "./logo-white.png", to: "/shadow" },
  ];
  return (
    <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        {menuItemList &&
          menuItemList.map((menuItem) => {
            return <SidebarItem key={menuItem.name} {...menuItem} />;
          })}
      </ul>
    </div>
  );
}

export default Sidebar;
