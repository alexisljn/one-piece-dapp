
export const deploy = async () => {
    const Administration = await ethers.getContractFactory('Administration');

    return await Administration.deploy();
}

export const addAdmin = async (administrationContract, accountToAdd, thirdPartyAccount = null) => {
    if (thirdPartyAccount !== null) {
        const administrationContractToThirdParty = administrationContract.connect(thirdPartyAccount);

        return await administrationContractToThirdParty.grantRole(accountToAdd);
    }

    return await administrationContract.grantRole(accountToAdd);
}

export const removeAdmin = async (administrationContract, accountToRemove, thirdPartyAccount = null) => {
    if (thirdPartyAccount !== null) {
        const administrationContractToThirdParty = administrationContract.connect(thirdPartyAccount);

        return await administrationContractToThirdParty.revokeRole(accountToRemove);
    }

    return await administrationContract.revokeRole(accountToRemove);
}

export const isAdmin = async (administrationContract, accountToCheck) => {
    return await administrationContract.hasRole(accountToCheck);
}

// Our custom role "ROLE_ADMIN" has a role admin to manage it.
export const getRoleAdminOfRoleAdmin = async (administrationContract) => {
    return await administrationContract.getRoleAdmin();
}

export const renounceRoleAdmin = async (administrationContract) => {
    return await administrationContract.renounceRole();
}
