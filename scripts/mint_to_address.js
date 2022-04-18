const { ethers } = require("hardhat");
const { contractInterface } = require("./contract/interface");

async function main() {
    let options = {};
    if (process.env.DEPLOY_NETWORK !== 'localhost') {
        let provider = new ethers.providers.AlchemyProvider(network=process.env.DEPLOY_NETWORK);
        const feeData = await provider.getFeeData();
        options = { gasPrice: feeData.gasPrice };
    }

    await contractInterface.totalMinted();

    let address = ethers.utils.getAddress("");
    await contractInterface.mintToAddress(address, options);
}

main();
