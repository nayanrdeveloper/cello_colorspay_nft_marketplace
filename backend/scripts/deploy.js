const hre = require("hardhat");

async function main() {
  const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log(`Marketplace deployed to ${marketplace.address}`);

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(marketplace.address);

  await myToken.deployed();

  console.log(`Marketplace deployed to ${myToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
