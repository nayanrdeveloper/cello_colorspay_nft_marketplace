import React, { useState } from "react";
import { useRouter } from "next/router";

function cube() {
  const router = useRouter();
  interface inputColorStruct {
    color1: string;
    color2: string;
    color3: string;
    size: string;
  }
  const [inputColor, setInputColor] = useState<inputColorStruct>({
    color1: "#556666",
    color2: "#444455",
    color3: "#878796",
    size: '0',
  });

  const createNFT = () => {
    const property = {
      backgroundColor: inputColor.color1,
      backgroundImage: `linear-gradient(30deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%, ${inputColor.color2}),linear-gradient(150deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%, ${inputColor.color2}),linear-gradient(30deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%,${inputColor.color2}),linear-gradient(150deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%, ${inputColor.color2}),linear-gradient(60deg, ${inputColor.color3} 25%, transparent 25.5%, transparent 75%, ${inputColor.color3} 75%, ${inputColor.color3}),linear-gradient(60deg, ${inputColor.color3} 25%, transparent 25.5%, transparent 75%, ${inputColor.color3} 75%, ${inputColor.color3})`,
      backgroundSize: `${80 + parseInt(inputColor.size)}px ${
        140 + (2 + parseInt(inputColor.size))
      }px`,
      backgroundPosition: `0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px`,
    };
    window.localStorage.setItem("gradient_color", JSON.stringify(property));
    router.push({
      pathname: `create_nft`,
    });
  };
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex gap-4 md:gap-2 flex-wrap">
          <div className="flex flex-col gap-2 justify-items-center">
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Color 1:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColor.color1}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    color1: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Color 2:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColor.color2}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    color2: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Color 3:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColor.color3}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    color3: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Size:
              </label>
              <input
                type={"number"}
                min="0"
                // max={"6"}
                className="input-border"
                value={inputColor.size}
                onChange={(e) => {
                  setInputColor({
                    ...inputColor,
                    size: e.currentTarget.value,
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
          <div
            className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
            style={{
              backgroundColor: inputColor.color1,
              backgroundImage: `linear-gradient(30deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%, ${inputColor.color2}),linear-gradient(150deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%, ${inputColor.color2}),linear-gradient(30deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%,${inputColor.color2}),linear-gradient(150deg, ${inputColor.color2} 12%, transparent 12.5%, transparent 87%, ${inputColor.color2} 87.5%, ${inputColor.color2}),linear-gradient(60deg, ${inputColor.color3} 25%, transparent 25.5%, transparent 75%, ${inputColor.color3} 75%, ${inputColor.color3}),linear-gradient(60deg, ${inputColor.color3} 25%, transparent 25.5%, transparent 75%, ${inputColor.color3} 75%, ${inputColor.color3})`,
              backgroundSize: `${80 + parseInt(inputColor.size)}px ${
                140 + (2 + parseInt(inputColor.size))
              }px`,
              backgroundPosition: `0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px`,
            }}
            // onMouseLeave={(event) => setIsCopiedText(false)}
            // onClick={onClickHandler}
            //   ref={previewRef}
          >
          </div>
        </div>
      </div>
    </div>
  );
}

export default cube;
