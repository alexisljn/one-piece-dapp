const {keccak256, toUtf8Bytes} = require("ethers/lib/utils");

const deploy = async () => {
    const Administration = await ethers.getContractFactory('Administration');

    return await Administration.deploy();
}

const addAdmin = async (administrationContract, accountToAdd, thirdPartyAccount = null) => {
    if (thirdPartyAccount !== null) {
        const administrationContractToThirdParty = administrationContract.connect(thirdPartyAccount);

        return await administrationContractToThirdParty.grantAdmin(accountToAdd);
    }

    return await administrationContract.grantAdmin(accountToAdd);
}

const removeAdmin = async (administrationContract, accountToRemove, thirdPartyAccount = null) => {
    if (thirdPartyAccount !== null) {
        const administrationContractToThirdParty = administrationContract.connect(thirdPartyAccount);

        return await administrationContractToThirdParty.revokeAdmin(accountToRemove);
    }

    return await administrationContract.revokeAdmin(accountToRemove);
}

const isAdmin = async (administrationContract, accountToCheck) => {
    return await administrationContract.isAdmin(accountToCheck);
}

// Our custom role "ROLE_ADMIN" has a role admin to manage it.
const getRoleAdminOfRoleAdmin = async (administrationContract) => {
    return await administrationContract.getRoleAdminOfRoleAdmin();
}

const renounceRoleAdmin = async (administrationContract, thirdPartyAccount = null) => {
    if (thirdPartyAccount != null) {
        const administrationContractToThirdParty = administrationContract.connect(thirdPartyAccount);

        return await administrationContractToThirdParty.renounceRoleAdmin();
    }

    return await administrationContract.renounceRoleAdmin();
}

const getRoleAdminHashed = () => {
    return keccak256(toUtf8Bytes('ROLE_ADMIN'))
}

exports.deploy = deploy;
exports.addAdmin = addAdmin;
exports.removeAdmin = removeAdmin;
exports.isAdmin = isAdmin;
exports.getRoleAdminOfRoleAdmin = getRoleAdminOfRoleAdmin;
exports.renounceRoleAdmin = renounceRoleAdmin;
exports.getRoleAdminHashed = getRoleAdminHashed;
