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

    it('Allowance mechanism', async () => {
        const Berry = await ethers.getContractFactory('Berry');

        const berry = await Berry.deploy();

        const [owner, addr1, addr2] = await ethers.getSigners();

        const allowanceAmount = ethers.BigNumber.from(100000* 10**10);

        await berry.approve(addr1.address, allowanceAmount);

        const founderAllowance = await berry.allowance(owner.address, addr1.address);

        expect(founderAllowance).to.equal(allowanceAmount);

        await berry.connect(addr1).transferFrom(owner.address, addr2.address, allowanceAmount);

        const account2Balance = await berry.balanceOf(addr2.address);

        expect(account2Balance).to.equal(allowanceAmount);
    })

    it('Transfer with insufficient funds', async () => {
        const Berry = await ethers.getContractFactory('Berry');

        const berry = await Berry.deploy();

        const [owner, addr1] = await ethers.getSigners();

        const amountNotInFounderBalance = ethers.BigNumber.from("10000000000000001");

        await expect(berry.transfer(addr1.address, amountNotInFounderBalance)).to.be.reverted;
    })

    it('Allowance of ')
})
