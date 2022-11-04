import React, { useState } from "react";

function diagonal() {
  interface colorInputStruct {
    color1: string;
    color2: string;
    horizontalGap: number;
    verticalGap: number;
  }
  const [colorInputs, setColorInputs] = useState({
    color1: "#eeeeee",
    color2: "#000000",
    horizontalGap: 60,
    verticalGap: 60,
  });
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
                Vertical Gap:
              </label>
              <input
                type={"number"}
                className="input-border"
                value={colorInputs.verticalGap}
                onChange={(e) => {
                  setColorInputs({
                    ...colorInputs,
                    verticalGap: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Horizontal Gap:
              </label>
              <input
                type={"number"}
                className="input-border"
                value={colorInputs.horizontalGap}
                onChange={(e) => {
                  setColorInputs({
                    ...colorInputs,
                    horizontalGap: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </div>
          </div>
          <div>
            <div
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundColor: colorInputs.color1,
                backgroundImage: `linear-gradient(45deg, ${colorInputs.color2} 25%, transparent 25%, transparent 75%, ${colorInputs.color2} 75%, ${colorInputs.color2}),linear-gradient(-45deg, ${colorInputs.color2} 25%, transparent 25%, transparent 75%, ${colorInputs.color2} 75%, ${colorInputs.color2})`,
                backgroundSize: `${colorInputs.horizontalGap}px ${colorInputs.verticalGap}px`,
              }}
              //   onMouseLeave={(event) => setIsCopiedText(false)}
              //   onClick={onClickHandler}
            >
              <span className="text-center text-white text-2xl cursor-pointer self-center mx-auto p-16 md:p-40 opacity-0 hover:opacity-100">
                {/* {isCopiedText ? "Copied" : "Copy"} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default diagonal;
