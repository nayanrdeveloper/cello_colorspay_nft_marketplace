import React, { useState } from "react";
import hexToRGB from "../../utils/hextorgb.js";

function tablecloth() {
  interface inputColorStruct {
    backgroundColor: string;
    verticalColor: string;
    horizontalColor: string;
    verticalSpace: number;
    horizontalSpace: number;
    verticalTransparent: number;
    horizontalTransparent: number;
  }
  const [inputColors, setInputColors] = useState<inputColorStruct>({
    backgroundColor: "#fff",
    verticalColor: "#FF0000",
    horizontalColor: "#f03547",
    verticalSpace: 50,
    horizontalSpace: 50,
    verticalTransparent: 0.5,
    horizontalTransparent: 0.5,
  });
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex flex-wrap gap-4 md:gap-2">
          <div className="flex flex-col gap-2 justify-items-center">
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Background-color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColors.backgroundColor}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    backgroundColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Vertical color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColors.verticalColor}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    verticalColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Horizontal Color:
              </label>
              <input
                type={"color"}
                className="input-border"
                value={inputColors.horizontalColor}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    horizontalColor: e.currentTarget.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Vertical Space:
              </label>
              <input
                type={"number"}
                className="input-border"
                value={inputColors.verticalSpace}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    verticalSpace: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Horizontal Space:
              </label>
              <input
                type={"number"}
                className="input-border"
                value={inputColors.horizontalSpace}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    horizontalSpace: parseInt(e.currentTarget.value),
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Vertical Transparency:
              </label>
              <input
                type={"number"}
                step="0.1"
                className="input-border"
                value={inputColors.verticalTransparent}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    verticalTransparent: parseFloat(e.currentTarget.value),
                  });
                }}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Horizontal Transparency:
              </label>
              <input
                type={"number"}
                step="0.1"
                className="input-border"
                value={inputColors.horizontalTransparent}
                onChange={(e) => {
                  setInputColors({
                    ...inputColors,
                    horizontalTransparent: parseFloat(e.currentTarget.value),
                  });
                }}
              />
            </div>
          </div>
          <div>
            <div
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundColor: inputColors.backgroundColor,
                backgroundImage: `linear-gradient(90deg, ${hexToRGB(
                  inputColors.verticalColor,
                  inputColors.verticalTransparent
                )} 50%, transparent 50%),linear-gradient(${hexToRGB(
                  inputColors.horizontalColor,
                  inputColors.horizontalTransparent
                )} 50%, transparent 50%)`,
                backgroundSize: `${inputColors.verticalSpace}px ${inputColors.horizontalSpace}px`,
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
      </div>
    </div>
  );
}

export default tablecloth;
