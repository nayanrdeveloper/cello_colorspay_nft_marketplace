import React, { useState } from "react";

function bricks() {
    interface colorInputStruct{
        color1: string;
        color2: string;
        color3: string;
    }
  const [colorInputs, setColorInputs] = useState<colorInputStruct>({
    color1: "#00FFFF",
    color2: "#dd0000",
    color3: "#bb0000",
  });
  return <div className="container px-5 py-10">
    <div className="fade-in-text">
        <div className="flex flex-wrap gap-4 md:gap-2">
          <div className="flex flex-col gap-2 justify-items-center">
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Color 1:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={colorInputs.color1}
                onChange={(e) => {
                  setColorInputs({
                    ...colorInputs,
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
                value={colorInputs.color2}
                onChange={(e) => {
                  setColorInputs({
                    ...colorInputs,
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
                value={colorInputs.color3}
                onChange={(e) => {
                  setColorInputs({
                    ...colorInputs,
                    color3: e.currentTarget.value,
                  });
                }}
              />
            </div>
          </div>
          <div
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundColor: colorInputs.color1,
                backgroundImage: `linear-gradient(335deg, ${colorInputs.color2} 23px, transparent 23px),linear-gradient(155deg, ${colorInputs.color3} 23px, transparent 23px),linear-gradient(335deg, ${colorInputs.color2} 23px, transparent 23px),linear-gradient(155deg, ${colorInputs.color3} 23px, transparent 23px)`,
                backgroundSize: "58px 58px",
                backgroundPosition: "0px 2px, 4px 35px, 29px 31px, 34px 6px"
              }}
    
                // onMouseLeave={(event) => setIsCopiedText(false)}
                // onClick={onClickHandler}
              //   ref={previewRef}
            >
              <span className="text-center text-white text-2xl cursor-pointer self-center mx-auto p-16 md:p-40 opacity-0 hover:opacity-100">
                {/* {isCopiedText ? "Copied" : "Copy"} */}
              </span>
            </div>
        </div>
      </div>
  </div>;
}

export default bricks;
