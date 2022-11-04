import React, { useState } from "react";

function waves() {
    interface inputColorStruct{
        backgroundColor: string;
        lineColor: string;
    }
  const [inputColor, setInputColor] = useState<inputColorStruct>({
    backgroundColor: "#708090",
    lineColor: "#d9ecff",
  });
  return <div className="container px-5 py-10">
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
          </div>
          <div>
            <div
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundImage: `linear-gradient(135deg, ${inputColor.backgroundColor} 21px, ${inputColor.lineColor} 22px, ${inputColor.lineColor} 24px, transparent 24px, transparent 67px, ${inputColor.lineColor} 67px, ${inputColor.lineColor} 69px, transparent 69px),linear-gradient(225deg, ${inputColor.backgroundColor} 21px, ${inputColor.lineColor} 22px, ${inputColor.lineColor} 24px, transparent 24px, transparent 67px, ${inputColor.lineColor} 67px, ${inputColor.lineColor} 69px, transparent 69px)`,
                backgroundSize: "64px 128px",
                backgroundColor: inputColor.backgroundColor,
              }}
            >
              <span className="text-center text-white text-2xl cursor-pointer self-center mx-auto p-16 md:p-40 opacity-0 hover:opacity-100">
                {/* {isCopiedText ? "Copied" : "Copy"} */}
              </span>
            </div>
          </div>
        </div>
      </div>
  </div>;
}

export default waves;
