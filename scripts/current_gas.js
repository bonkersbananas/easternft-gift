const { ethers } = require("hardhat");

async function main() {
    let provider = new ethers.providers.AlchemyProvider(network=process.env.DEPLOY_NETWORK);
    const feeData = await provider.getFeeData();

    console.log(feeData.gasPrice);
    let gasPriceAsEther = ethers.utils.formatEther(feeData.gasPrice.toString());
    let gasPriceAsGwei = gasPriceAsEther * Math.pow(10, 9);
    console.log(`${ gasPriceAsGwei } gwei`);
}

main();
