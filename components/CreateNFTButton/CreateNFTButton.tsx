import React from "react";

interface colorProperty{
  property: string;
}

function CreateNFTButton(colorProperty: colorProperty) {
  console.log(colorProperty.property);
  
  return (
    <div>
      <button className="bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]">
        Create NFT
      </button>
    </div>
  );
}

export default CreateNFTButton;
