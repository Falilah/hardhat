// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Gold is ERC721URIStorage {
    constructor(string memory _tokenURI) public ERC721("IWura", "IW") {
        _mint(msg.sender, 1);

        _setTokenURI(1, _tokenURI);
    }
}
