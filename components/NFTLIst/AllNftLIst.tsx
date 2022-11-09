import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import NFTCard from "./NFTCard";
import Web3 from "web3";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newKitFromWeb3 } from "@celo/contractkit";

const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
import marketplaceAbi from "./../../contract_data/Marketplace.js";
import tokenContractAbi from "../../contract_data/MyToeknAbi";
import { useCelo } from "@celo/react-celo";

function AllNftLIst() {
  const [NFTData, setNFTData] = useState<any>();
  const { kit, address, network, performActions } = useCelo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getAllNFTs = async () => {
    try {
      setIsLoading(true);
      let marketaplceContract = new kit.connection.web3.eth.Contract(
        marketplaceAbi as any,
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
      );

      let tokenContract = new kit.connection.web3.eth.Contract(
        tokenContractAbi as any,
        process.env.NEXT_PUBLIC_TOKEN_CONTRACT
      );
      let nfts = await marketaplceContract.methods.getAllNFTs().call();
      console.log(nfts);
      let newItems = await Promise.all(
        nfts.map(async (d: any) => {
          const tokenUri = await tokenContract.methods
            .tokenURI(d._tokenId)
            .call();
          const meta = await axios.get(tokenUri);
          const price = web3.utils.fromWei(d.price.toString(), "ether");
          const imageUrl = `https://ipfs.io/ipfs/${meta.data.image.substr(7)}`;
          console.log(d._tokenId);
          return {
            price,
            tokenId: d._tokenId,
            seller: d.seller,
            owner: d.owner,
            image: imageUrl,
            name: meta.data.name,
            desc: meta.data.description,
          };
        })
      );
      setNFTData(newItems);
      setIsLoading(false);
      console.log(newItems);
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    getAllNFTs();
  }, []);
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
  );
}

export default AllNftLIst;
