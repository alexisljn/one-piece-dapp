async function main() {
    // We get the contract to deploy
    const SimpleStorage = await ethers.getContractFactory("Berry");
    const berryContract = await SimpleStorage.deploy();

    // NOTE: All Contracts have an associated address
    console.log("Contract deployed to:", berryContract.address);
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