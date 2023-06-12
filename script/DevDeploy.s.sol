// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "lib/forge-std/src/Script.sol";

import {OffscriptPayment} from "contracts/Payment.sol";

contract DevDeployScript is Script {
    function setUp() public {}

    function run() public {
        OffscriptPayment.PaymentTokenParams[] memory tokens = new OffscriptPayment.PaymentTokenParams[](4);

        tokens[0] = OffscriptPayment.PaymentTokenParams({
            token: address(0x0),
            oracle: address(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419)
        });
        // DAI
        tokens[1] = OffscriptPayment.PaymentTokenParams({
            token: address(0x6B175474E89094C44Da98b954EedeAC495271d0F),
            oracle: address(0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9)
        });
        // USDC
        tokens[2] = OffscriptPayment.PaymentTokenParams({
            token: address(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48),
            oracle: address(0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6)
        });
        // USDT
        tokens[3] = OffscriptPayment.PaymentTokenParams({
            token: address(0xdAC17F958D2ee523a2206206994597C13D831ec7),
            oracle: address(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D)
        });

        uint16 price = 1065;
        uint16 discountPct = 20; // TODO
        uint16 supply = 100; // TODO
 
        vm.broadcast();
        OffscriptPayment payment = new OffscriptPayment(tokens, price, discountPct, supply);
    }
}
