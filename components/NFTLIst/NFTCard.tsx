import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

function NFTCard(NFTCardData: any) {
  return (
    <div data-aos="fade-up">
      <div className="p-2 bg-[#242435] rounded-lg hover:shadow-2xl hover:shadow-[#00a3ff]">
        <Image
          src={NFTCardData.image}
          height={330}
          width={330}
          alt="title"
          className="transform mx-auto transition duration-500 hover:scale-110"
        />
        <Link href={`/NFT/${NFTCardData.tokenId}`}>
          <h4 className="text-white text-2xl font-bold cursor-pointer">
            {NFTCardData.name}
          </h4>
        </Link>
        <div className="flex justify-between">
          <span className="text-[#00a3ff]">{NFTCardData.price}wETH</span>
          <span className="text-white flex">
            <FaHeart className="mt-1 mr-1" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default NFTCard;