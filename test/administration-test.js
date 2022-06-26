const { expect } = require('chai');
const {deploy, isAdmin, getRoleAdminOfRoleAdmin, addAdmin, getRoleAdminHashed, removeAdmin} = require("./helpers/AdministrationTestHelper");

// Deploiement
// founder est bien admin (hasRole)
// Le role pour gerer le role admin est bien role admin
// Ajout d'un admin
// Retrait d'un admin
// Renoncement role

// NEG
// Retrait d'un admin par lui même
// Ajout d'un admin par un user non admin
// Retrait du role admin du founder
// hasRole d'un user non admin


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


    })
})
