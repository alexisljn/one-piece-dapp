
const {deployAdministration} = require("./AdministrationTestHelper");

const deployBerry = async () => {
    const administrationContract = await deployAdministration();

    const aggregatorV3Contract = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"; // Won't work locally, but to make the constructor not crash

    const Berry = await ethers.getContractFactory('Berry');

    return await Berry.deploy(administrationContract.address, aggregatorV3Contract);
}

const deployBerryOnRinkeby = async () => {
    const aggregatorV3Contract = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";

    const Berry = await ethers.getContractFactory('Berry');

    return await Berry.deploy("0x0fAa888b5124337Ae2aE3Cd3c0C770608ff90401", aggregatorV3Contract);
}

const getBalance = async (berryContract, account) => {
    return await berryContract.balanceOf(account);
}

const transferBerry = async (berryContract, amount, receiver, thirdPartyAccount = null) => {
    if (thirdPartyAccount) {
        const berryContractToThirdParty = berryContract.connect(thirdPartyAccount);

        return await berryContractToThirdParty.transfer(amount, receiver);
    }

    return await berryContract.transfer(amount, receiver);
}

const giveAllowance = async (berryContract, amount, spender, thirdPartyAccount = null) => {
    if (thirdPartyAccount) {
        const berryContractToThirdParty = berryContract.connect(thirdPartyAccount);

        return await berryContractToThirdParty.approve(spender, amount);
    }

    return await berryContract.approve(spender, amount);
}

const getAllowance = async (berryContract, owner, spender) => {
    return await berryContract.allowance(owner, spender);
}

const transferBerryFrom = async (berryContract, owner, receiver, amount, thirdPartyAccount = null) => {
    if (thirdPartyAccount) {
        const berryContractToThirdParty = berryContract.connect(thirdPartyAccount);

        return await berryContractToThirdParty.transferFrom(owner, receiver, amount);
    }

    return await berryContract.transferFrom(owner, receiver, amount);
}

exports.deployBerry = deployBerry;
exports.getBalance = getBalance;
exports.transferBerry = transferBerry;
exports.giveAllowance = giveAllowance;
exports.getAllowance = getAllowance;
exports.transferBerryFrom = transferBerryFrom;
