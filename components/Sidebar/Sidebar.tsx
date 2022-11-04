import React from "react";
import NavLogo from "../Navbar/NavLogo";
import SidebarItem from "./SidebarItem";
import { IconType } from "react-icons";
import {FaGripHorizontal, FaCubes, FaChessBoard, FaGripLinesVertical } from "react-icons/fa";
import {GiGamepadCross, GiWaves} from "react-icons/gi"
import {ImTable} from "react-icons/im"
import {BsBricks} from "react-icons/bs"

function Sidebar() {
  interface menuItemObj {
    name: string;
    image: IconType;
    to: string;
  }
  const menuItemList: menuItemObj[] = [
    { name: "CROSS DOTS", image: GiGamepadCross, to: "/cross_dots" },
    { name: "HORIZONTAL STRIPS", image: FaGripHorizontal, to: "/horizontal_strips" },
    { name: "WAVES", image: GiWaves, to: "/waves" },
    { name: "TABLECLOTH", image: ImTable, to: "/tablecloth" },
    { name: "Cube", image: FaCubes, to: "/cubes" },
    { name: "Bricks", image: BsBricks, to: "/bricks" },
    { name: "DIAGONAL", image: FaChessBoard, to: "/diagonal" },
    { name: "VERTICAL STRIPS", image: FaGripLinesVertical, to: "/vertical_strips" },
  ];
  return (
    <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap  px-0 flex flex-wrap items-center w-full mx-auto border-r gap-8">
      <NavLogo />
      <ul className="md:flex-col md:min-w-full flex flex-col list-none gap-4">
        {menuItemList &&
          menuItemList.map((menuItem) => {
            return <SidebarItem key={menuItem.name} {...menuItem} />;
          })}
      </ul>
    </div>
  );
}

export default Sidebar;
