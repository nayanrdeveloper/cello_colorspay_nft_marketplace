import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";

function tokenId() {
  const router = useRouter();
  const { tokenId: number } = router.query;
  const [NFTData, setNFTData] = useState<{
    image: string;
    name: string;
    price: number;
    description: string;
    seller: string;
  }>();
  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">Product Details</span>
        {NFTData ? (
          <div className="grid grid-cols-2 mt-8">
            <div>
              <Image src={NFTData.image} alt="" height={450} width={450} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <h3 className="text-3xl text-white font-bold">
                  {NFTData.name}
                </h3>
                <span className="text-white flex my-auto p-2 bg-[#242435] rounded-md">
                  <FaHeart className="mt-1 mr-1" />
                  200
                </span>
              </div>
              <span className="text-[#00a3ff]">{NFTData.price}wETH</span>
              <span className="text-white font-bold">
                Category <span className="text-[#acacac]"> royalties</span>
              </span>
              <p className="text-[#acacac]">{NFTData.description}</p>
              <p className="text-[#acacac]">
                <span className="text-white">Seller:</span> {NFTData.seller}
              </p>
              <button
                // onClick={butNFT}
                className="inline w-32 bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
              >
                Buy Now
              </button>
              {/* <ToastContainer theme="dark" /> */}
            </div>
          </div>
        ) : (
          <span className="flex justify-center my-auto">
            {" "}
            <Loader />{" "}
          </span>
        )}
      </div>
    </div>
  );
}

export default tokenId;
