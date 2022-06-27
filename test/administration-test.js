const { expect } = require('chai');
const {deploy, isAdmin, getRoleAdminOfRoleAdmin, addAdmin, getRoleAdminHashed, removeAdmin, renounceRoleAdmin} = require("./helpers/AdministrationTestHelper");

describe('Administration Contract', () => {

    it('Is founder account an admin', async () => {
        const contract = await deploy();

        const [founder] = await ethers.getSigners();

        expect(await isAdmin(contract, founder.address)).to.be.true;
    })

    it('is "ROLE_ADMIN" the role that manages the role admin ', async () => {
        const contract = await deploy();

        expect(await getRoleAdminOfRoleAdmin(contract)).to.equal(getRoleAdminHashed());
    })

    it('Grant a new admin and check its role', async () => {
        const contract = await deploy();

        const [founder, newAdmin, notAdmin] = await ethers.getSigners();

        await expect(await addAdmin(contract, newAdmin.address))
            .to
            .emit(contract, 'RoleGranted')
            .withArgs(getRoleAdminHashed(), newAdmin.address, founder.address)
        ;

        expect(await isAdmin(contract, newAdmin.address)).to.be.true;
    })

    it('Revoke grant', async () => {
        const contract = await deploy();

        const [founder, newAdmin] = await ethers.getSigners();

        await addAdmin(contract, newAdmin.address)

        expect(await isAdmin(contract, newAdmin.address)).to.be.true;

        await expect(await removeAdmin(contract, newAdmin.address))
            .to
            .emit(contract, 'RoleRevoked')
            .withArgs(getRoleAdminHashed(), newAdmin.address, founder.address)
        ;

        expect(await isAdmin(contract, newAdmin.address)).to.be.false;
    })


        expect(await isAdmin(contract, newAdmin.address)).to.be.true;
    })


    })
})
