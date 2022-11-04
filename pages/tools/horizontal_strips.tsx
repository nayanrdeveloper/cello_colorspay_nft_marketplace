import React, { useState } from "react";

function horizontal_strips() {
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
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex flex-wrap md:gap-2 gap-4">
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
          </div>
          <div>
            <div
              className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
              style={{
                backgroundColor: inputColor.backgroundColor,
                backgroundImage: originalProperty.backgroundImage,
                backgroundSize: originalProperty.backgroundSize,
              }}
              //   onMouseEnter={setBackgroundProperty}
              onClick={onClickHandler}
              //   ref={previewRef}
            >
              <span className="text-center text-white text-2xl cursor-pointer self-center mx-auto p-16 md:p-40 opacity-0 hover:opacity-100"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default horizontal_strips;
