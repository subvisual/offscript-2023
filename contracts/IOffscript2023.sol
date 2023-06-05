// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

interface IOffscript2023 is IERC721 {
    struct Metadata {
        uint8 discount;
        string name;
    }

    function getMetadata(uint256 tokenId) external view returns (uint8 discount, string memory name);
}
