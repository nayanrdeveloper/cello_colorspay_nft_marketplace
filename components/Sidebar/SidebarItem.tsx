import Link from "next/link";
import React from "react";

interface menuItemObj {
  name: string;
  image: string;
  to: string;
}

function SidebarItem({ name, image, to }: menuItemObj) {
  return (
    <li className="items-center flex gap-3" id="menu-button">
      <img
        src={image}
        className="mr-2 text-sm opacity-75 w-14 h-14"
        alt="dashboard"
      />
      <span className="text-xs uppercase py-3 font-bold block text-lightBlue-500 hover:text-lightBlue-600">
        {name}
      </span>
    </li>
  );
}

export default SidebarItem;
