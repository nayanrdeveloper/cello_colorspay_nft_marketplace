import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Loader from "../Loader/Loader";
import Web3 from "web3";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import marketplaceAbi from "./../../contract_data/Marketplace.js";
import tokenContractAbi from "../../contract_data/MyToeknAbi";
import { useRouter } from "next/router";
import { newKitFromWeb3 } from "@celo/contractkit";
import { useCelo } from "@celo/react-celo";
import Image from "next/image";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

function NFTDetails() {
  const router = useRouter();
  const { tokenId } = router.query;
  const [NFTData, setNFTData] = useState<any>();
  const { kit, address, network, performActions } = useCelo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBuyingLoading, setIsBuyingLoading] = useState<boolean>(false);
  useEffect(() => {
    if (tokenId) {
      getNFTDetails();
    }
  }, [tokenId]);

  const getNFTDetails = async () => {
    setIsLoading(true);
    try {
      let marketaplceContract = new kit.connection.web3.eth.Contract(
        marketplaceAbi as any,
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
      );

      let tokenContract = new kit.connection.web3.eth.Contract(
        tokenContractAbi as any,
        process.env.NEXT_PUBLIC_TOKEN_CONTRACT
      );

      let nfts = await marketaplceContract.methods
        .getListedTokenByTokenId(tokenId)
        .call();
      const tokenURI = await tokenContract.methods
        .tokenURI(`${tokenId}`)
        .call();
      let meta: any = await axios.get(tokenURI);
      meta = meta.data;
      const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
      let item = {
        price: meta.price,
        itemId: nfts.itemId,
        tokenId: tokenId,
        seller: nfts.seller,
        owner: nfts.owner,
        image: imageUrl,
        name: meta.name,
        description: meta.description,
      };
      setNFTData(item);
      setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const buyNFT = async () => {
    setIsBuyingLoading(true);
    try {
      let marketaplceContract = new kit.connection.web3.eth.Contract(
        marketplaceAbi as any,
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
      );
      let price = Web3.utils.toWei(NFTData.price.toString(), "ether");
      const result3 = await marketaplceContract.methods
        .executeSale(process.env.NEXT_PUBLIC_TOKEN_CONTRACT, NFTData.itemId)
        .send({ from: address, value: price });
      setIsBuyingLoading(false);
      toast.success("NFT create successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error((error as Error).message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsBuyingLoading(false);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="container my-8">
        <div className="">
          <span className="text-white text-3xl font-bold">NFT Details</span>
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
                {NFTData.owner != address && (
                  <button
                    onClick={buyNFT}
                    className="inline w-32 bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
                  >
                    <span className="flex justify-center justify-items-center text-center">
                      {isBuyingLoading && (
                        <ColorRing
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={[
                            "#e15b64",
                            "#f47e60",
                            "#f8b26a",
                            "#abbd81",
                            "#849b87",
                          ]}
                        />
                      )}
                      <span className="my-auto">Buy Now</span>
                    </span>
                  </button>
                )}
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
    </div>
  );
}

export default NFTDetails;
