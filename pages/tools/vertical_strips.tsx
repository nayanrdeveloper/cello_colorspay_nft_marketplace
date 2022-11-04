import React, { useState } from "react";

function vertical_strips() {
  interface colorInputStruct {
    color1: string;
    color2: string;
    gap: number;
  }
  const [colorInputs, setColorInputs] = useState<colorInputStruct>({
    color1: "#808080",
    color2: "#ffffff",
    gap: 50,
  });
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex flex-wrap md:gap-2 gap-4">
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
                Gap:
              </label>
              <input
                type={"number"}
                className="input-border"
                value={colorInputs.gap}
                min="1"
                onChange={(e) => {
                  setColorInputs({
                    ...colorInputs,
                    gap: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </div>
          </div>
          <div
            className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
            style={{
              backgroundColor: colorInputs.color1,
              backgroundImage: `linear-gradient(90deg, transparent 50%, ${colorInputs.color2} 50%)`,
              backgroundSize: `${colorInputs.gap}px 50px`,
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
  );
}

export default vertical_strips;
