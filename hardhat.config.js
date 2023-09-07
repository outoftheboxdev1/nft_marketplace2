const fs = require('fs');

require('@nomiclabs/hardhat-waffle');

// hardhat.config.js
// require('dotenv').config();
require('@nomiclabs/hardhat-ethers');

// const privateKey = fs.readFileSync('.secret').toString().trim();
// const privateKey = fs.readFileSync('.secret-live').toString().trim();
const privateKey = fs.readFileSync('.secret-live').toString().trim();

// live apikey
// const apiKey = '4b36fd3a66de4df2a14959056f390144';
const apiKey = 'TAkHUAvH-yCNsX0FqJeoXmZvHTEgn5n4';

// test apikey
// const apiKey = 'ead6becc90db437c83fede80213d3902';

module.exports = {
  // networks: {
  // Test Connection Localhost
  //   hardhat: {
  //     chainId: 1337,
  //   },
  //   mumbai: {
  //     url: 'https://rpc-mumbai.maticvigil.com',
  //     accounts: [privateKey],
  //   },
  //   // rinkeby: {
  //   // url: 'https://rinkeby.infura.io/v3/bed4fdcc76bb4978a9a3103ef0946f64',
  //   //   accounts: [privateKey],
  //   // },
  defaultNetwork: 'matic',
  networks: {
    hardhat: {},
    matic: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
  },
  // },
  // networks: {
  //   hardhat: {
  //     chainId: 11155111,
  //   },
  //   sepolia: {
  //     url: 'https://rpc.sepolia.org',
  //     accounts: privateKey,
  //   },
  // },
  // networks: {
  //   mainnet: {
  //     url: `https://mainnet.infura.io/v3/${apiKey}`,
  //     accounts: [privateKey],
  //   },
  // },
  // solidity: {
  //   version: '0.8.4', // or the version you are using
  // },
};

