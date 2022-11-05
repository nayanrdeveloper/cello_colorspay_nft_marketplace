// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    address payable owner;
    using Counters for Counters.Counter;

    Counters.Counter private _itemId;
    Counters.Counter private _soldItems;

    uint256 listingPrice = 0.01 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct ListedToken {
        uint256 itemId;
        uint256 _tokenId;
        address nftContract;
        address payable seller;
        address payable owner;
        uint256 price;
        bool currtlyListed;
    }

    mapping(uint256 => ListedToken) idToListedToken;

    function updateLIstedPrice(uint256 _updatePrice) public {
        require(msg.sender == owner, "Only Ownrer update listed Price");
        listingPrice = _updatePrice;
    }

    function getListedPrice() public view returns (uint256) {
        return listingPrice;
    }

    function latestListedToken() public view returns (ListedToken memory) {
        uint256 currentTokenId = _itemId.current();
        return idToListedToken[currentTokenId];
    }

    event CreatedToken(
        address indexed _nftAddresss,
        uint256 tokenId,
        uint256 itemId,
        address indexed seller,
        address indexed owner,
        uint256 price
    );

    function createToken(
        address nftAddress,
        uint256 tokenId,
        uint256 _price
    ) public payable nonReentrant returns (uint256) {
        require(_price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Pirce must be equal to listing price"
        );
        _itemId.current();
        uint256 currentItemId = _itemId.current();

        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        createListedToken(currentItemId, tokenId, nftAddress, _price);
        return currentItemId;
    }

    function createListedToken(
        uint256 itemdId,
        uint256 _tokenId,
        address nftContract,
        uint256 _price
    ) private {
        idToListedToken[_tokenId] = ListedToken(
            itemdId,
            _tokenId,
            nftContract,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );

        emit CreatedToken(
            nftContract,
            _tokenId,
            itemdId,
            msg.sender,
            address(0),
            _price
        );
    }

    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint256 _totlaItems = _itemId.current();
        uint currentIndex = 0;
        ListedToken[] memory tokens = new ListedToken[](_totlaItems);

        for (uint i = 0; i < _totlaItems; i++) {
            ListedToken storage currentToken = idToListedToken[i + 1];
            tokens[currentIndex] = currentToken;
            currentIndex++;
        }

        return tokens;
    }

    function getMyNfts() public view returns (ListedToken[] memory) {
        uint256 _totalItems = _itemId.current();
        uint256 myNftCount = 0;
        uint256 index = 0;

        for (uint i = 0; i < _totalItems; i++) {
            if (
                idToListedToken[i + 1].seller == msg.sender ||
                idToListedToken[i + 1].owner == msg.sender
            ) {
                myNftCount++;
            }
        }

        ListedToken[] memory myNfts = new ListedToken[](myNftCount);
        for (uint i = 0; i < _totalItems; i++) {
            if (
                idToListedToken[i + 1].seller == msg.sender ||
                idToListedToken[i + 1].owner == msg.sender
            ) {
                ListedToken storage currentToken = idToListedToken[i + 1];
                myNfts[index] = currentToken;
                index++;
            }
        }

        return myNfts;
    }

    function executeSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToListedToken[itemId].price;
        uint256 tokenId = idToListedToken[itemId]._tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete this purchase"
        );
        idToListedToken[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToListedToken[itemId].owner = payable(msg.sender);
        idToListedToken[itemId].currtlyListed = true;
        _soldItems.increment();
        payable(owner).transfer(listingPrice);
    }
}