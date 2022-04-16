let { network } = require("hardhat");
let { SafeEthersSigner, SafeService } = require('@gnosis.pm/safe-ethers-adapters');
let EthersAdapter = require('@gnosis.pm/safe-ethers-lib');
let Safe = require('@gnosis.pm/safe-core-sdk');

async function main() {
    let deployNetwork = 'matic';
    let safeTransactionUrl = 'https://safe-transaction.polygon.gnosis.io/';
    let service = new SafeService(safeTransactionUrl);

    let privateKey = network.config.accounts[0];
    let provider = new ethers.providers.AlchemyProvider(network=deployNetwork);
    let signer = new ethers.Wallet(privateKey, provider);

    let ethAdapter = new EthersAdapter.default({ ethers, signer });
    let safe = await Safe.default.create({ ethAdapter, safeAddress: process.env.GNOSIS_ADDRESS });
    let safeSigner = new SafeEthersSigner(safe, service, provider);

    let { deployments } = require("../deployments/addresses.json");
    let contractAddress = deployments[deployNetwork].contractAddress;

    let contractArtifactPath = "artifacts/contracts/NFT.sol/NFT.json";
    let contractArtifactBase = `../deployments/${ deployNetwork }`;
    let { abi } = require(`${ contractArtifactBase }/${ contractArtifactPath }`);
    let contract = new ethers.Contract(contractAddress, abi, safeSigner);

    let options = {};
    const feeData = await provider.getFeeData();
    options = { gasPrice: feeData.gasPrice };

    let tx = await contract.withdrawAll();
    console.log(tx);
    console.log(tx.hash);
    await tx.wait();
    console.log('done');
    /*
    let tx = await safeSigner.sendTransaction({
        to: "0x39bEb60bc4c1b8b0eBeEDC515c7A56e7DfB3a5A9",
        value: ethers.utils.parseEther("0.001")
    });
    console.log(tx);
    await tx.wait();
    console.log('done');
    */

    // Contract interface
    // let contract = new ethers.Contract(contractAddress, abi, signer);



}

main();
