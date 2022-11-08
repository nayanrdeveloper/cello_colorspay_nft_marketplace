import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import { NFTStorage, File } from "nft.storage";
import html2canvas from "html2canvas";

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
  }, []);

  const createImage = async () => {
    let canvas = await html2canvas(refContainer.current),
      data = canvas.toDataURL("image/png"),
      link = document.createElement("a");
    let myImage = document.createElement("image");
    const myFile = await createImageFile(data, "gradient_color", "image/png");
    console.log(myFile);
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
    console.log(listingPrice);
    const result3 = await marketaplceContract.methods
      .createToken(process.env.NEXT_PUBLIC_TOKEN_CONTRACT, tokenId, price)
      .send({ from: address, value: price });
  };
 
  

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
          <button onClick={createNFT}>Create NFT</button>
        </div>
        <div>
          <div
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
