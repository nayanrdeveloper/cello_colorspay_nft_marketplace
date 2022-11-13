import React, { useEffect, useState } from "react";
import Values from "values.js";
import { useRouter } from "next/router";

function AllShades() {
  const [color, setColor] = useState("#0081cb");
  const [shades, setShades] = useState([]);
  const [backgroundColorProperty, setBackGroundColorProperty] = useState("");
  const router = useRouter();

  const createShades = (color: any) => {
    const shades_color = new Values(color);
    let shades: any = shades_color.shades(1);
    console.log(shades[0].rgbString());

    setShades(shades);
  };

  const createNFT = (event: any) => {
    const property = {
      backgroundColor: event.currentTarget.style.backgroundColor,
    };
    window.localStorage.setItem("gradient_color", JSON.stringify(property));
    router.push({
      pathname: `create_nft`,
    });
  };

  useEffect(() => {
    createShades(color);
  }, [color]);
  return (
    <div className="container px-5 py-10">
      <div className="fade-in-text">
        <div className="flex justify-items-center">
          <label htmlFor="gradient-type" className="mr-2 text-gray-500">
            Color:
          </label>
          <input
            type={"color"}
            className="input-border"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <span className="mr-2 text-gray-500 text-2xl">Click your choice color and create NFT</span>
      </div>
      <div className="fade-in-text mt-5">
        <div className="grid grid-cols-2 md:grid-cols-10 gap-1">
          {shades &&
            shades.map((shade: any) => (
              <div
                key={shade.hexString()}
                onClick={createNFT}
                className="flex justify-center h-20 w-20 content-center items-center cursor-pointer hover:-translate-y-1 hover:scale-110 palette-hover"
                style={{ backgroundColor: shade.hexString() }}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllShades;
