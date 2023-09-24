require('@nomiclabs/hardhat-waffle');

// hardhat.config.js
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

// const privateKey = fs.readFileSync('.secret').toString().trim();
const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
const apiKey = process.env.NEXT_PUBLIC_MAINNET;

module.exports = {
  solidity: '0.8.4',

  networks: {
    mainnet: {
      hardhat: {
        chainId: 1,
      },
      url: `https://mainnet.infura.io/v3/${apiKey}`,
      accounts: [privateKey],
    },
  },
};

