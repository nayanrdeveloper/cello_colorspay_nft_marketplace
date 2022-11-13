import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface socialMediaListStruct {
  icon: IconType;
  url: string;
}

function FooterSocialMedia(socialMedia: socialMediaListStruct) {
  return (
    <Link href={socialMedia.url} target={"_blank"}>
      <li className="cursor-pointer">
        <div className="rounded-full p-2 text-2xl bg-[#242435] hover:bg-[#00a3ff] hover:text-white cursor-pointer hover:scale-105 duration-300">
          {<socialMedia.icon />}
        </div>
      </li>
    </Link>
  );
}

export default FooterSocialMedia;
