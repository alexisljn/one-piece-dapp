/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle"); // Make ethers variable available in global scope
const dotenv = require("dotenv")

dotenv.config();

module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './frontend/src/artifacts' // ABI available for frontend
  },
  defaultNetwork: "hardhat",
  networks: { // Metamask fix
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/50cd5eaf8dc540cc9fae0dd04281af33',
      accounts: [process.env.RINKEBY_PRIMARY_ACCOUNT],
      timeout: 60000
    }
  }
};
