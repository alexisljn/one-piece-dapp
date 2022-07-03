const { expect } = require('chai');
const {deployBerry, getBalance, transferBerry, giveAllowance, getAllowance, transferBerryFrom, bigNumberToString,
    getBerryPrice
} = require("./helpers/BerryTestHelper");
const {deployAdministration} = require("./helpers/AdministrationTestHelper");

describe('Berry Contract', () => {
    it('deployment', async () => {
        const berryContract = await deployBerry();

        const [owner] = await ethers.getSigners();

        const founderBalance = await getBalance(berryContract, owner.address);

        expect(founderBalance).to.equal(ethers.BigNumber.from(bigNumberToString(10000000 * 10**10))); // 10 millions
    })

    // it('Send from admin to another addr', async () => {
    //     const berryContract = await deployBerry();
    //
    //     const [owner, addr1] = await ethers.getSigners();
    //
    //     await transferBerry(berryContract, addr1.address, ethers.BigNumber.from(bigNumberToString(1000000 * 10**10)));
    //
    //     const founderBalance = await getBalance(berryContract, owner.address);
    //
    //     const accountBalance = await getBalance(berryContract, addr1.address);
    //
    //     expect(founderBalance).to.equal(ethers.BigNumber.from(bigNumberToString(9000000* 10**10)));
    //     expect(accountBalance).to.equal(ethers.BigNumber.from(bigNumberToString(1000000* 10**10)));
    // })
    //
    // it('Allowance mechanism', async () => {
    //     const berryContract = await deployBerry();
    //
    //     const [owner, addr1, addr2] = await ethers.getSigners();
    //
    //     const allowanceAmount = ethers.BigNumber.from(bigNumberToString(1000000* 10**10));
    //
    //     await giveAllowance(berryContract, allowanceAmount, addr1.address);
    //
    //     const founderAllowance = await getAllowance(berryContract, owner.address, addr1.address);
    //
    //     expect(founderAllowance).to.equal(allowanceAmount);
    //
    //     await transferBerryFrom(berryContract, owner.address, addr2.address, allowanceAmount, addr1);
    //
    //     const receiverBalance = await getBalance(berryContract, addr2.address);
    //
    //     expect(receiverBalance).to.equal(allowanceAmount);
    // })
    //
    // it('Transfer with insufficient funds', async () => {
    //     const berryContract = await deployBerry();
    //
    //     const [owner, addr1] = await ethers.getSigners();
    //
    //     await expect(transferBerry(berryContract, addr1.address, ethers.BigNumber.from(bigNumberToString(20000000 * 10**10))))
    //         .to
    //         .be
    //         .revertedWith('Lack of funds');
    // })
    //
    // it('Get berry price', async () => {
    //     const berryContract = await deployBerry();
    //
    //     const [owner, addr1] = await ethers.getSigners();
    //
    //     console.log(await getBerryPrice(berryContract, 10));
    // })
})
