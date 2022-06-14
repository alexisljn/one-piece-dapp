/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle"); // Make ethers variable available in global scope

module.exports = {
  solidity: "0.8.0",

  networks: { // Metamask fix
    hardhat: {
      chainId: 1337,
    },
  }
};
