// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "lib/forge-std/src/Script.sol";

import "contracts/mocks/Token.sol";
import "contracts/mocks/Oracle.sol";
import {OffscriptPayment} from "contracts/Payment.sol";

contract DevDeployScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        address dai = address(new DAI());
        address usdc = address(new USDC());
        address usdt = address(new USDT());

        address usdOracle = address(new FakeOracleUSD());
        address ethOracle = address(new FakeOracleETH());

        OffscriptPayment.PaymentTokenParams[] memory tokens = new OffscriptPayment.PaymentTokenParams[](4);

        tokens[0] = OffscriptPayment.PaymentTokenParams({token: address(0x0), oracle: ethOracle});
        // DAI
        tokens[1] = OffscriptPayment.PaymentTokenParams({token: dai, oracle: usdOracle});
        // USDC
        tokens[2] = OffscriptPayment.PaymentTokenParams({token: usdc, oracle: usdOracle});
        // USDT
        tokens[3] = OffscriptPayment.PaymentTokenParams({token: usdt, oracle: usdOracle});

        uint16 price = 1065;
        uint16 discountPct = 20; // TODO
        uint16 supply = 100; // TODO

        OffscriptPayment payment = new OffscriptPayment(tokens, price, discountPct, supply);

        // DAI(dai).mint(address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 1000 ether);
        // DAI(usdc).mint(address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 1000e6);
        // DAI(usdt).mint(address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266), 1000e6);
        vm.stopBroadcast();
    }
}
