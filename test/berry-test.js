const { expect } = require('chai');

describe('Berry Contract', () => {
    it('deployment', async () => {
        const Berry = await ethers.getContractFactory('Berry');

        const berry = await Berry.deploy();

        const [owner, addr1] = await ethers.getSigners();

        const founderBalance = await berry.balanceOf(owner.address);

        expect(founderBalance).to.equal(ethers.BigNumber.from("10000000000000000"));
    })

    it('Send from admin to another addr', async () => {
        const Berry = await ethers.getContractFactory('Berry');

        const berry = await Berry.deploy();

        const [owner, addr1] = await ethers.getSigners();
        await berry.transfer(addr1.address, ethers.BigNumber.from("1000000000000000"))

        const founderBalance = await berry.balanceOf(owner.address);

        const accountBalance = await berry.balanceOf(addr1.address);

        const supposedFounderBalance = 900000* 10**10;
        const supposedAccountBalance = 100000* 10**10;

        expect(founderBalance).to.equal(ethers.BigNumber.from(supposedFounderBalance));
        expect(accountBalance).to.equal(ethers.BigNumber.from(supposedAccountBalance));
    })
})