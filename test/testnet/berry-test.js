const { expect } = require('chai');
const {deployBerryOnRinkeby, getBerryPrice} = require("../helpers/BerryTestHelper");

describe('Berry Contract on Rinkeby', () => {
    it('get berry price', async () => {
        const berryContract = await deployBerryOnRinkeby();

        console.log(await getBerryPrice(berryContract, 550000505));
    });
})
