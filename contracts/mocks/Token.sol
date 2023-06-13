// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract FakeToken is ERC20 {
    uint8 _decimals;

    constructor(string memory name, uint8 __decimals) ERC20(name, name) {
        _decimals = __decimals;
        _mint(msg.sender, 1000 * 10 ** _decimals);
    }

    function decimals() public view override(ERC20) returns (uint8) {
        return _decimals;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract DAI is FakeToken("DAI", 18) {}

contract USDC is FakeToken("USDC", 6) {}

contract USDT is FakeToken("USDO", 6) {}
