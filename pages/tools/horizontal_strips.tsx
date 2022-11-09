import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";

function horizontal_strips() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  const router = useRouter();
  interface inputColorStruct {
    backgroundColor: string;
    stripeColor: string;
    horizontalGap: number;
  }
  interface originalPropertyStruct {
    backgroundColor: string;
    backgroundImage: string;
    backgroundSize: string;
  }
  const [inputColor, setInputColor] = useState<inputColorStruct>({
    backgroundColor: "#808080",
    stripeColor: "#585858",
    horizontalGap: 50,
  });
  const [originalProperty, setOriginalProperty] =
    useState<originalPropertyStruct>({
      backgroundColor: inputColor.backgroundColor,
      backgroundImage: `linear-gradient(transparent 50%, ${inputColor.stripeColor} 50%)`,
      backgroundSize: `50px ${inputColor.horizontalGap}px`,
    });
  const onClickHandler = () => {
    navigator.clipboard.writeText(
      `background-color: ${inputColor.backgroundColor}; background-image: ${originalProperty.backgroundImage}; background-size: ${originalProperty.backgroundSize}`
    );
  };
  const createNFT = () => {
    const property = {
      backgroundColor: inputColor.backgroundColor,
      backgroundImage: originalProperty.backgroundImage,
      backgroundSize: originalProperty.backgroundSize,
    };
    window.localStorage.setItem("gradient_color", JSON.stringify(property));
    router.push({
      pathname: `create_nft`,
    });
  };
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex flex-wrap md:gap-2 gap-4">
          <div className="flex flex-col gap-2 justify-items-center" data-aos="fade-right">
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
                  setOriginalProperty({
                    ...originalProperty,
                    backgroundColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Stripe Color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColor.stripeColor}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    stripeColor: e.currentTarget.value,
                  });
                  setOriginalProperty({
                    ...originalProperty,
                    backgroundImage: `linear-gradient(transparent 50%, ${e.currentTarget.value} 50%)`,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Horizontal-Gap:
              </label>
              <input
                type={"number"}
                className="input-border"
                value={inputColor.horizontalGap}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    horizontalGap: parseInt(e.currentTarget.value),
                  });
                  setOriginalProperty({
                    ...originalProperty,
                    backgroundSize: `50px ${e.currentTarget.value}px`,
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
                backgroundColor: inputColor.backgroundColor,
                backgroundImage: originalProperty.backgroundImage,
                backgroundSize: originalProperty.backgroundSize,
              }}
              onClick={onClickHandler}
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default horizontal_strips;
