import React, { useEffect, useState } from "react";

function create_nft() {
  const [colorName, setColorName] = useState<string | null>();
  useEffect(() => {
    if(typeof window !== "undefined"){
      setColorName(window.localStorage.getItem("gradient_color"))
    }
  },[]);
  
  return (
    <div className="container px-5 py-10">
      <div className="flex gap-2">
        <div className="flex flex-col border border-[#ffffff14] p-10 bg-[#24243557] rounded-lg gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#acacac]">
              Product Name
            </label>
            <input
              type="text"
              // onChange={onchangeProductInput}
              name="name"
              // value={productData.name}
              required
              id="name"
              placeholder=" e.g. Digital Awesome NFT"
              className="input-border w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="desc" className="text-[#acacac]">
              Description
            </label>
            <textarea
              id="desc"
              // onChange={onchangeProductInput}
              // value={productData.desc}
              name="desc"
              placeholder=" Enter NFT Description"
              className="h-36 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-[#acacac]">
              Product Price
            </label>
            <input
              type="number"
              // onChange={onchangeProductInput}
              // value={productData.price}
              id="price"
              name="price"
              placeholder=" e.g. 20"
              className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
            />
          </div>
        </div>
        <div>
          <div
            className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 ml-10"
            style={colorName? JSON.parse(colorName): {}}
            // onClick={onClickHandler}
          >
          </div>
        </div>
      </div>
    </div>
  );
}

export default create_nft;
