// SPDX-License-Identifier: CC0-1.0

pragma solidity ^0.8.4;

import "./ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error MintNotStarted(string error);
error MintFinished(string error);
error MintPriceNotPaid(string error);

contract NFT is ERC721A {
    using Strings for uint256;

    mapping (address => bool) private _contractOwners;
    string private _tokenBaseURI = 'https://easter.infura-ipfs.io/ipfs/QmTouQUHudZzdx4GLgqQRsAEraxDNQY9ASep7nJ6CjFPcC/';
    uint256 public maxSupply = 25;

    constructor() ERC721A("ETHster Gift", "ETHSTERGIFT") {
        _contractOwners[0x39bEb60bc4c1b8b0eBeEDC515c7A56e7DfB3a5A9] = true;
        _contractOwners[0x9eaD888876b3978E8b138d4B6416111255B89e03] = true;
        _contractOwners[0xAeB37Ff5C6a7f43e721849873EdA2dAe2b6871F9] = true;
        _contractOwners[_msgSender()] = true;
    }

    function isContractOwner(address _address) public view returns (bool) {
        return _contractOwners[_address];
    }

    modifier onlyContractOwner() {
        require(_contractOwners[_msgSender()], "Ownable: caller is not the contract owner");
        _;
    }

    function mintToAddress(address _address) external onlyContractOwner {
        if (!(_totalMinted() < maxSupply)) revert MintFinished({
            error: "No more supply to mint"
        });

        _safeMint(_address, 1);
    }

    function setBaseURI(string memory baseURI) public onlyContractOwner {
        _tokenBaseURI = baseURI;
    }

    function withdrawAll() public payable onlyContractOwner {
        require(payable(_msgSender()).send(address(this).balance));
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    function totalMinted() public view returns (uint256) {
        unchecked {
            return _currentIndex - _startTokenId();
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        return string(abi.encodePacked(_tokenBaseURI, tokenId.toString(), ".json"));
    }
}
