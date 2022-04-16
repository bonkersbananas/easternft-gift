const { contractInterface } = require("./contract/interface");

async function main() {
    let newBaseUrl = 'https://easter.infura-ipfs.io/ipfs/QmNU1eLytFQLp1QL4WSdR9wNHmCFjF1RdmksvXx6E3T6S2/';
    await contractInterface.setBaseURI(newBaseUrl);
}

main();
