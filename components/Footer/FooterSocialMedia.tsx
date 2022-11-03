import Image from "next/image";
import React from "react";
import { IconType } from "react-icons";

interface socialMediaListStruct {
  icon: IconType;
  url: string;
}

function FooterSocialMedia(socialMedia: socialMediaListStruct) {
  return (
    <li>
      <div className="rounded-full p-2 text-2xl bg-[#242435] hover:bg-[#00a3ff] hover:text-white">
        {<socialMedia.icon />}
      </div>
    </li>
  );
}

export default FooterSocialMedia;
