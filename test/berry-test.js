const { expect } = require('chai');

describe('Berry Contract', () => {
    it('deployment', async () => {
        const Berry = await ethers.getContractFactory('Berry');

        const berry = await Berry.deploy();

        const [owner, addr1] = await ethers.getSigners();

        const founderBalance = await berry.balanceOf(owner.address);

        expect(founderBalance).to.equal(ethers.BigNumber.from("10000000000000000"));
    })

    
})