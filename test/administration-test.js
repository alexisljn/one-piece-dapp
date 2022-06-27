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

    it('Admin renounce to role', async () => {
        const contract = await deploy();

        const [founder, newAdmin] = await ethers.getSigners();

        await addAdmin(contract, newAdmin.address);

        expect(await isAdmin(contract, newAdmin.address)).to.be.true;

        await expect(await renounceRoleAdmin(contract, newAdmin))
            .to
            .emit(contract, 'RoleRevoked')
            .withArgs(getRoleAdminHashed(), newAdmin.address, newAdmin.address)
        ;

        expect(await isAdmin(contract, newAdmin.address)).to.be.false;

    })

    it('Admin try to revoke his role by calling revokeRole directly', async () => {
        const contract = await deploy();

        const [founder, newAdmin] = await ethers.getSigners();

        await addAdmin(contract, newAdmin.address);

        expect(await isAdmin(contract, newAdmin.address)).to.be.true;

        await expect(removeAdmin(contract, newAdmin.address, newAdmin))
            .to
            .be
            .revertedWith("You cannot revoke your role admin")
        ;
    })

    it("Non-admin account try to grant a non-admin account of role admin", async () => {
        const contract = await deploy();

        const [founder, notAdmin, secondNotAdmin] = await ethers.getSigners();

        await expect(addAdmin(contract, secondNotAdmin.address, notAdmin))
            .to
            .be
            .revertedWith("is missing role")
        ;
    })

    it("Admin user try to revoke role admin of founder", async () => {
        const contract = await deploy();

        const [founder, newAdmin] = await ethers.getSigners();

        await addAdmin(contract, newAdmin.address);

        expect(await isAdmin(contract, newAdmin.address)).to.be.true;

        await expect(removeAdmin(contract, founder.address, newAdmin))
            .to
            .be
            .revertedWith('founder will always be admin')
        ;
    })

    it('Non-admin account is actually not an admin', async () => {
        const contract = await deploy();

        const [founder, notAdmin] = await ethers.getSigners();

        expect(await isAdmin(contract, notAdmin.address)).to.be.false;
    })

    it('Founder try to renounce to his role admin', async () => {
        const contract = await deploy();

        await expect(renounceRoleAdmin(contract))
            .to
            .be
            .revertedWith('founder cannot renounce to role admin')
        ;
    })
})
