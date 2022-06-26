require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');



module.exports = {
  solidity: "0.8.1",
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/e6099d0f5484416eabbbcb1b927ba62d',
      accounts: ['a7bed1688b12c65cf31cd11948746c3368863f47ef672a20af564c53d49c48f6'],
    },
  },
};