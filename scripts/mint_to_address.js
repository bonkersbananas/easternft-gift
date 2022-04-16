const { ethers } = require("hardhat");
const { contractInterface } = require("./contract/interface");

async function main() {
    await contractInterface.totalMinted();

    let address = ethers.utils.getAddress("0x39beb60bc4c1b8b0ebeedc515c7a56e7dfb3a5a9");
    await contractInterface.mintToAddress(address);
}

main();
