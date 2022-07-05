async function main() {

    const Administration = await ethers.getContractFactory("Administration");
    const administrationContract = await Administration.deploy();

    // We get the contract to deploy
    const Berry = await ethers.getContractFactory("Berry");
    const berryContract = await Berry.deploy(administrationContract.address, "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419");

    // NOTE: All Contracts have an associated address
    console.log("Administration contract deployed to:", administrationContract.address);
    console.log("Berry contract deployed to:", berryContract.address);
}

(async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})();
