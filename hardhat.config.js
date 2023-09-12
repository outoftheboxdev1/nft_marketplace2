const fs = require('fs');

require('@nomiclabs/hardhat-waffle');

// hardhat.config.js
// require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

// const privateKey = fs.readFileSync('.secret').toString().trim();
const privateKey = fs.readFileSync('.secret-live').toString().trim();
const apiKey = 'ead6becc90db437c83fede80213d3902';

module.exports = {
  // networks: {
  // // Test Connection Localhost
  //   // hardhat: {
  //   //   chainId: 1337,
  //   //   blockConfirmations: 1,
  //   // },
  //   // mumbai: {
  //   //   url: 'https://rpc-mumbai.maticvigil.com',
  //   //   accounts: [privateKey],
  //   // },
  // //   // rinkeby: {
  // //   // url: 'https://rinkeby.infura.io/v3/bed4fdcc76bb4978a9a3103ef0946f64',
  // //   //   accounts: [privateKey],
  // //   // },
  // },
  // solidity: '0.8.4',
  solidity: '0.8.4',
  networks: {
    sepolia: {
      hardhat: {
        chainId: 142,
      },
      url: `https://sepolia.infura.io/v3/${apiKey}`,
      accounts: [privateKey],
    },
  },
  // networks: {
  //   mainnet: {
  //     hardhat: {
  //       chainId: 1,
  //     },
  //     url: `https://mainnet.infura.io/v3/${apiKey}`,
  //     accounts: [privateKey],
  //   },
  // },
  // solidity: {
  //   version: '0.8.4', // or the version you are using
  //   // settings: {
  //   //   optimizer: {
  //   //     enabled: true,
  //   //     runs: 200,
  //   //   },
  //   // },
  // },
};

