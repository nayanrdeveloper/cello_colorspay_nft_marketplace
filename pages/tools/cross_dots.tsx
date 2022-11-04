import React, { useState } from "react";

function cross_dots() {
  interface colorInputStruct {
    backgroundColor: string;
    lineColor: string;
    dotColor: string;
  }
  interface originalPropertyStruct {
    backgroundSize: string;
    backgroundPosition: string;
  }
  const [colorInputs, setColorInputs] = useState<colorInputStruct>({
    backgroundColor: "#ffffff",
    lineColor: "#a4a4a4",
    dotColor: "#000000",
  });
  const [originalProperty, setOriginalProperty] =
    useState<originalPropertyStruct>({
      backgroundSize:
        "109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px",
      backgroundPosition: "54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px",
    });

  const [crossBackgroundColor, setCrossBackgroundColor] = useState<string>(
    `radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),linear-gradient(${colorInputs.backgroundColor} 4px, transparent 0),linear-gradient(45deg, transparent 74px, transparent 75px, ${colorInputs.lineColor} 75px, ${colorInputs.lineColor} 76px, transparent 77px, transparent 109px),linear-gradient(-45deg, transparent 75px, transparent 76px, ${colorInputs.lineColor} 76px, ${colorInputs.lineColor} 77px, transparent 78px, transparent 109px)`
  );

  const onClickHandler = () => {
    navigator.clipboard.writeText(stringProperty);
  };

  const [stringProperty, setStringProperty] = useState<string>(
    `background-image:${crossBackgroundColor}; background-size: ${originalProperty.backgroundSize}; background-position: ${originalProperty.backgroundPosition};background-color: ${colorInputs.backgroundColor}}`
  );

  const updateStringProperty = () => {
    setStringProperty(
      `background-image : ${crossBackgroundColor}; background-size:109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px; background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px; background-color: ${colorInputs.backgroundColor}`
    );
  };

  const updateOriginalProperty = () => {
    setCrossBackgroundColor(
      `radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),radial-gradient(${colorInputs.dotColor} 3px, transparent 4px),linear-gradient(${colorInputs.backgroundColor} 4px, transparent 0),linear-gradient(45deg, transparent 74px, transparent 75px, ${colorInputs.lineColor} 75px, ${colorInputs.lineColor} 76px, transparent 77px, transparent 109px),linear-gradient(-45deg, transparent 75px, transparent 76px, ${colorInputs.lineColor} 76px, ${colorInputs.lineColor} 77px, transparent 78px, transparent 109px)`
    );
  };
  return <div className="container px-5 py-10">
  <div className="fade-in-text">
    <div className="flex gap-4 md:gap-2 flex-wrap">
      <div className="flex flex-col gap-2 justify-items-center">
        <div className="flex justify-items-center justify-between">
          <label htmlFor="gradient-type" className="mr-2 text-gray-500">
            Background-color:
          </label>
          <input
            type={"color"}
            className="input-border"
            value={colorInputs.backgroundColor}
            onChange={(e) => {
              updateOriginalProperty();
              updateStringProperty();
              setColorInputs({
                ...colorInputs,
                backgroundColor: e.currentTarget.value,
              });
            }}
          />
        </div>
        <div className="flex justify-items-center justify-between">
          <label htmlFor="gradient-type" className="mr-2 text-gray-500">
            Dot Color:
          </label>
          <input
            type={"color"}
            className="input-border"
            value={colorInputs.dotColor}
            onChange={(e) => {
              updateOriginalProperty();
              updateStringProperty();
              setColorInputs({
                ...colorInputs,
                dotColor: e.currentTarget.value,
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
            value={colorInputs.lineColor}
            onChange={(e) => {
              updateOriginalProperty();
              updateStringProperty();
              setColorInputs({
                ...colorInputs,
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
            backgroundColor: colorInputs.backgroundColor,
            backgroundImage: crossBackgroundColor,
            backgroundSize: originalProperty.backgroundSize,
            backgroundPosition: originalProperty.backgroundPosition,
          }}
          //   onMouseEnter={setBackgroundProperty}
            onClick={onClickHandler}
          //   ref={previewRef}
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

export default cross_dots;
