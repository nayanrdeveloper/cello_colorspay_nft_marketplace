import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import AOS from "aos";
import "aos/dist/aos.css";
import { newKitFromWeb3 } from "@celo/contractkit";
import { NFTStorage, File } from "nft.storage";
import html2canvas from "html2canvas";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
const kit = newKitFromWeb3(web3);
import marketplaceAbi from "./../../contract_data/Marketplace.js";
import tokenContractAbi from "../../contract_data/MyToeknAbi";
import { useCelo } from "@celo/react-celo";

function create_nft() {
  interface productDataStruct {
    name: string;
    price: number;
    desc: string;
  }
  const [colorName, setColorName] = useState<string | null>();
  const [productData, setProductData] = useState<productDataStruct>({
    name: "",
    price: 0,
    desc: "",
  });
  const { kit, address, network, performActions } = useCelo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const refContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    if (typeof window !== "undefined") {
      setColorName(window.localStorage.getItem("gradient_color"));
    }
    AOS.init({
      duration: 1000,
    });
  }, []);

  const createImage = async () => {
    let canvas = await html2canvas(refContainer.current),
      data = canvas.toDataURL("image/png"),
      link = document.createElement("a");
    let myImage = document.createElement("image");
    const myFile = await createImageFile(data, "gradient_color", "image/png");
    return myFile;
  };

  const createImageFile = async (
    url: string,
    fileName: string,
    mimeType: string
  ) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], fileName, { type: mimeType });
  };

  const onchangeProductInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductData({
      ...productData,
      [(event.target as HTMLInputElement | HTMLTextAreaElement).name]: (
        event.target as HTMLInputElement | HTMLTextAreaElement
      ).value,
    });
  };

  const createNFT = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const nftStorage = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY || "",
      });
      const link = await nftStorage.store({
        image: await createImage(),
        name: productData.name,
        description: productData.desc,
        price: productData.price,
      });

      const ipfsURL: string = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
      let tokenContract = new kit.connection.web3.eth.Contract(
        tokenContractAbi as any,
        process.env.NEXT_PUBLIC_TOKEN_CONTRACT
      );
      const result = await tokenContract.methods
        .createToken(ipfsURL)
        .send({ from: address });

      const tokenId = result.events.Transfer.returnValues.tokenId;

      let marketaplceContract = new kit.connection.web3.eth.Contract(
        marketplaceAbi as any,
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
      );
      let listingPrice = await marketaplceContract.methods
        .getListedPrice()
        .call();
      let price = Web3.utils.toWei(productData.price.toString(), "ether");
      listingPrice = await listingPrice.toString();
      // const gesLimit = await marketaplceContract.methods
      //   .createToken(process.env.NEXT_PUBLIC_TOKEN_CONTRACT, tokenId, price)
      //   .send({ from: address, value: price }).estimateGas();
      //   console.log(gesLimit);
        
      const result3 = await marketaplceContract.methods
        .createToken(process.env.NEXT_PUBLIC_TOKEN_CONTRACT, tokenId, price)
        .send({ from: address, value: price });
      setProductData({
        name: "",
        desc: "",
        price: 0,
      });
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
    }
  };

  return (
    <div className="container px-5 py-10">
      <ToastContainer />
      <div className="flex gap-2">
        <div
          className="flex flex-col border border-[#ffffff14] p-10 bg-[#24243557] rounded-lg gap-4 w-full"
          data-aos="fade-right"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-[#acacac]">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              required
              id="name"
              placeholder=" e.g. Digital Awesome NFT"
              className="input-border w-full"
              onChange={onchangeProductInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="desc" className="text-[#acacac]">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={productData.desc}
              placeholder=" Enter NFT Description"
              onChange={onchangeProductInput}
              className="h-36 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="text-[#acacac]">
              Product Price
            </label>
            <input
              type="number"
              onChange={onchangeProductInput}
              value={productData.price}
              id="price"
              name="price"
              placeholder=" e.g. 20"
              className="h-12 w-full bg-[#242435] border-2 border-[#ffffff14] text-white rounded-md focus:border focus:border-[#00a3ff]"
            />
          </div>
          <button
            className="hover:bg-[#212e48] w-40 py-2 px-2 rounded-xl text-white bg-[#00a3ff] duration-300"
            disabled={isLoading}
            onClick={createNFT}
          >
            <span className="flex justify-items-center justify-center text-center">
              {isLoading && (
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
              <span className="my-auto">Create NFT</span>
            </span>
          </button>
        </div>
        <div>
          <div
            data-aos="fade-left"
            className="flex border border-black gradient-preview w-44 h-44 md:w-96 md:h-96 ml-10"
            style={colorName ? JSON.parse(colorName) : {}}
            ref={refContainer}
            // onClick={onClickHandler}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default create_nft;
