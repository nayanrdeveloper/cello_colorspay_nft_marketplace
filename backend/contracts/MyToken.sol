// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    address contractAddress;

    constructor(address marketplaceAddress) ERC721("CelloNFT", "CELLO") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenId.increment();
        uint256 newItemId = _tokenId.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }
}