// require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-ethers");
require("hardhat-celo");

const defaultNetwork = "alfajores";
const mnemonicPath = "m/44'/52752'/0'/0"; // derivation path used by Celo


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
  etherscan: {
    apiKey: {
        alfajores: process.env.CELOSCAN_API_KEY,
        celo: process.env.CELOSCAN_API_KEY
    },
  },
};
