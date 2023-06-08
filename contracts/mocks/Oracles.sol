// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockOracleUSD {
    uint8 public constant decimals = 8;

    function latestRoundData() public view returns (uint80, int256, uint256, uint256, uint80) {
        return (92233720368547764930, 100020065, 1645809777, 1645809777, 92233720368547764930);
    }
}

contract MockOracleETH {
    uint8 public constant decimals = 8;

    function latestRoundData() public view returns (uint80, int256, uint256, uint256, uint80) {
        return (92233720368547764930, 269778720387, 1645811714, 1645811714, 92233720368547778130);
    }
}
