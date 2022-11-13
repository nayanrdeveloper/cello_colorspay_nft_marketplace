import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

function GradientColor() {
  const router = useRouter();
  const [color1, setColor1] = useState("#cf0404");
  const [color2, setColor2] = useState("#2b2da6");
  const [color3, setColor3] = useState("#56c45a");
  const [direction, setDirection] = useState("top");
  const [gradientType, setGradientType] = useState("linear-gradient");
  const directionInput = useRef() as React.MutableRefObject<HTMLSelectElement>;
  const directionList = [
    { name: "top", value: "&#x2191;" },
    { name: "right top", value: "&#x2197;" },
    { name: "right", value: "&#x2192;" },
    { name: "right bottom", value: "&#x2198;" },
    { name: "left bottom", value: "&#x2199;" },
    { name: "left", value: "&#x2190;" },
  ];

  const getRandomColor = () => {
    const hexLetters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hexLetters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomDirection = () => {
    console.log(directionInput);

    var g = directionList[Math.floor(Math.random() * directionList.length)];
    return g.value;
  };

  const randomGradientGenerate = () => {
    const direction = randomDirection();
    const colorGenerated_1 = getRandomColor();
    const colorGenerated_2 = getRandomColor();
    const colorGenerated_3 = getRandomColor();
    var codeGenerated =
      "linear-gradient( to " +
      randomDirection() +
      ", " +
      colorGenerated_1 +
      ", " +
      colorGenerated_2 +
      ", " +
      colorGenerated_3 +
      " )";
    setColor1(colorGenerated_1);
    setColor2(colorGenerated_2);
    setColor3(colorGenerated_3);
    setDirection(direction);
    // colorPreviewref.current.style.backgroundImage = codeGenerated;
  };

  const createNFT = () => {
    const property = {
      backgroundImage: `${gradientType}(${color1}, ${color2}, ${color3})`,
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
                Color 1:
              </label>
              <input
                id="color1"
                type="color"
                //   ref={color1_input}
                name="color1"
                className="input-border"
                value={color1}
                onChange={(event) => setColor1(event.currentTarget.value)}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Color 1:
              </label>
              <input
                id="color1"
                type="color"
                //   ref={color1_input}
                name="color1"
                className="input-border"
                value={color1}
                onChange={(event) => setColor1(event.currentTarget.value)}
              />
            </div>
            <div className="flex justify-items-center justify-between">
              <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Color 3:
              </label>
              <input
                id="color3"
                type="color"
                //   ref={color3_input}
                name="color3"
                className="input-border"
                value={color3}
                onChange={(event) => setColor3(event.currentTarget.value)}
              />
            </div>
            {/* <div className="flex justify-items-center justify-between">
              <select
                className="input-border"
                name="direction"
                id="direction-select"
                value={direction}
                ref={directionInput}
                onChange={(event) => setDirection(event.currentTarget.value)}
              >
                <option value="top">&#x2191;</option>
                <option value="right top">&#x2197;</option>
                <option value="right">&#x2192;</option>
                <option value="right bottom">&#x2198;</option>
                <option value="bottom">&#x2193;</option>
                <option value="left bottom">&#x2199;</option>
                <option value="left">&#x2190;</option>
              </select>
            </div> */}
            <div className="flex justify-items-center justify-between">
            <label htmlFor="gradient-type" className="mr-2 text-gray-500">
                Gradient Type:
              </label>
              <select
                className="input-border"
                name="direction"
                id="direction-select"
                value={gradientType}
                ref={directionInput}
                onChange={(event) => setGradientType(event.currentTarget.value)}
              >
                <option value="linear-gradient">Linear Gradient</option>
                <option value="radial-gradient">Radial Gradient</option>
                <option value="conic-gradient">Conic Gradient</option>
              </select>
            </div>
            <button
              onClick={createNFT}
              className="hover:bg-[#212e48] w-40 py-2 px-2 rounded-xl text-white bg-[#00a3ff] duration-300"
            >
              Create NFT
            </button>
          </div>
          <div
            data-aos="fade-left"
            className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 md:ml-52"
            style={{
              backgroundImage : `${gradientType}(${color1}, ${color2}, ${color3})`
              
            }}
          >
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradientColor;
