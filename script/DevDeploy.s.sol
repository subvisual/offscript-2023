// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "lib/forge-std/src/Script.sol";

contract DevDeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        vm.stopBroadcast();
    }
}
