import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaHouseUser } from "react-icons/fa";
import { IconType } from "react-icons";
import FooterSocialMedia from "./FooterSocialMedia";

function Footer() {
  interface socialMediaListStruct {
    icon: IconType;
    url: string;
  }
  const socialMediaList: socialMediaListStruct[] = [
    {
      icon: FaLinkedin,
      url: "https://in.linkedin.com/in/nayanrdeveloper",
    },
    {
      icon: FaGithub,
      url: "https://github.com/nayanrdeveloper",
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com/nayan_radadiya6",
    }, 
    {
      icon: FaHouseUser,
      url: "https://nayanrdeveloper-portfolio.netlify.app/",
    }, 
  ];
  return (
    <footer className="px-16 py-8 border-t border-[#ffffff14]">
      <div className="flex justify-between text-[#acacac]">
        <div className="flex gap-2">
          <span className="border-r border-[#ffffff14] px-2">
            ©2022 NFTPattern, Inc. All rights reserved
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
