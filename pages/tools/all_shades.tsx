import React, { useEffect, useState } from "react";
import Values from "values.js";
import { useRouter } from "next/router";
import AllShades from "../../components/ColorTools/AllShades";


function all_shades() {
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
    <div>
      <AllShades />
    </div>
  );
}

export default all_shades;
