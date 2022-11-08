import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import NFTCard from './NFTCard';

function AllNftLIst() {
    const [NFTData, setNFTData] = useState<any>();

    const getAllNFTs = () => {
        
    }
  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">All NFT</span>
        <div>
          <div className={`grid ${NFTData ? "grid-cols-3" : ""} gap-9 mt-8`}>
            {NFTData ? (
              NFTData.map((NFTCardData: any) => {
                return <NFTCard key={NFTCardData.tokenId} {...NFTCardData} />;
              })
            ) : (
              <span className="flex justify-center my-auto">
                {" "}
                <Loader />{" "}
              </span>
            )}
            {/* {NFTCardList.map((NFTCardData) => {
              return <NFTCard key={NFTCardData.title} data={NFTCardData} />;
            })} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllNftLIst