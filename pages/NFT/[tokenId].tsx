import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";
import NFTDetails from "../../components/NFTDetails/NFTDetails";

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
      <NFTDetails />
    </div>
  );
}

export default tokenId;
