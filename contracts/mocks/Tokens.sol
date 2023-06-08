// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract DAI is ERC20("DAI", "DAI") {
    constructor() {
        _mint(msg.sender, 1000 ether);
    }

    function decimals() public view override(ERC20) returns (uint8) {
        return 18;
    }
}

contract USDC is ERC20("USDC", "USDC") {
    constructor() {
        _mint(msg.sender, 1000 ether);
    }

    function decimals() public view override(ERC20) returns (uint8) {
        return 6;
    }
}

contract USDT is ERC20("USDT", "USDT") {
    constructor() {
        _mint(msg.sender, 1000 ether);
    }

    function decimals() public view override(ERC20) returns (uint8) {
        return 6;
    }
}
