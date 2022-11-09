import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";

function waves() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  const router = useRouter();
  interface inputColorStruct {
    backgroundColor: string;
    lineColor: string;
  }
  const [inputColor, setInputColor] = useState<inputColorStruct>({
    backgroundColor: "#708090",
    lineColor: "#d9ecff",
  });
  const createNFT = () => {
    const property = {
      backgroundImage: `linear-gradient(135deg, ${inputColor.backgroundColor} 21px, ${inputColor.lineColor} 22px, ${inputColor.lineColor} 24px, transparent 24px, transparent 67px, ${inputColor.lineColor} 67px, ${inputColor.lineColor} 69px, transparent 69px),linear-gradient(225deg, ${inputColor.backgroundColor} 21px, ${inputColor.lineColor} 22px, ${inputColor.lineColor} 24px, transparent 24px, transparent 67px, ${inputColor.lineColor} 67px, ${inputColor.lineColor} 69px, transparent 69px)`,
      backgroundSize: "64px 128px",
      backgroundColor: inputColor.backgroundColor,
    };
    window.localStorage.setItem("gradient_color", JSON.stringify(property));
    router.push({
      pathname: `create_nft`,
    });
  };
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex flex-wrap gap-4 md:gap-2">
          <div
            className="flex flex-col gap-2 justify-items-center"
            data-aos="fade-right"
          >
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Background-color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColor.backgroundColor}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    backgroundColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Line Color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColor.lineColor}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    lineColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <button
              onClick={createNFT}
              className="hover:bg-[#212e48] w-40 py-2 px-2 rounded-xl text-white bg-[#00a3ff] duration-300"
            >
              Create NFT
            </button>
          </div>
          <div>
            <div
              data-aos="fade-left"
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundImage: `linear-gradient(135deg, ${inputColor.backgroundColor} 21px, ${inputColor.lineColor} 22px, ${inputColor.lineColor} 24px, transparent 24px, transparent 67px, ${inputColor.lineColor} 67px, ${inputColor.lineColor} 69px, transparent 69px),linear-gradient(225deg, ${inputColor.backgroundColor} 21px, ${inputColor.lineColor} 22px, ${inputColor.lineColor} 24px, transparent 24px, transparent 67px, ${inputColor.lineColor} 67px, ${inputColor.lineColor} 69px, transparent 69px)`,
                backgroundSize: "64px 128px",
                backgroundColor: inputColor.backgroundColor,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default waves;
