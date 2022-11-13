import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { observer } from 'mobx-react-lite'
// import Store from '../../storeData'
import { useStore } from '../storeProvider'


interface menuItemObj {
  name: string;
  image: IconType;
  to: string;
}

function SidebarItem(data: menuItemObj) {
  const store = useStore()
  return (
    <Link href={data.to}>
      <li
        className="items-center flex gap-3 text-[#acacac] cursor-pointer hover:text-white hover:scale-105 duration-300"
        id="menu-button"
      >
        {<data.image className="w-10 h-10" />}
        {
          store.getIsSidebarHide && <p>Hello</p>
        }
          <span className="text-xs uppercase py-3 font-bold block">
            {data.name}
          </span>
      </li>
    </Link>
  );
}

export default SidebarItem;
