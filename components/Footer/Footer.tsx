import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";
import FooterSocialMedia from "./FooterSocialMedia";

function Footer() {
  interface socialMediaListStruct {
    icon: IconType;
    url: string;
  }
  const socialMediaList: socialMediaListStruct[] = [
    {
      icon: FaFacebook,
      url: "",
    },
    {
      icon: FaTwitter,
      url: "",
    },
    {
      icon: FaInstagram,
      url: "",
    },
    {
      icon: FaLinkedin,
      url: "",
    },
  ];
  return (
    <footer className="px-16 py-8 border-t border-[#ffffff14]">
      <div className="flex justify-between text-[#acacac]">
        <div className="flex gap-2">
          <span className="border-r border-[#ffffff14] px-2">
            ©2022 Nuron, Inc. All rights reserved
          </span>
          <ul className="flex gap-2">
            <li>Terms</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="">
        <ul className="flex gap-2">
            {
                socialMediaList.map((socialMedia: socialMediaListStruct, index: number) => {
                    return <FooterSocialMedia key={index} {...socialMedia} />
                })
            }
            </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
