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

        vm.broadcast();
        payment.addToWhitelist(whitelist());
    }

    function whitelist() internal view returns (address[] memory addrs) {
        addrs = new address[](26);
        addrs[0] = address(0x809FA673fe2ab515FaA168259cB14E2BeDeBF68e);
        addrs[1] = address(0xc9A900B5C828aC2d30bCa757aB3d5A5Dd9E74a73);
        addrs[2] = address(0x39cf6E0Ba4C4530735616e1Ee7ff5FbCB726fBd2);
        addrs[3] = address(0x99101372ecF5252544c58EEF00859AbCe52274D3);
        addrs[4] = address(0x8C4F71B3cF6a76dE2CC239a6fA84E1a80e589598);
        addrs[5] = address(0xA678b33BC6171EeE107d93C6dE48d3402C2585B3);
        addrs[6] = address(0x4b793C4003d5E7efec37E0E1B0Ea8FfB535F3956);
        addrs[7] = address(0x136d662d55Fa8ab68737E9bF6e66795F86677ef7);
        addrs[8] = address(0x22361401F457F7e90FC91AE5875E3a08f5471fC0);
        addrs[9] = address(0x956D5740B3477F0B46daE26753B07EcBd8055908);
        addrs[10] = address(0x02C545e7E16afbBe405FaD98a8a5a9a9fEeCe114);
        addrs[11] = address(0x576e91733D9d27b3aaad9072ef68594ce4D8f52B);
        addrs[12] = address(0x5d20f971447b9DfC55Ec161a2d8914d20f24c86A);
        addrs[13] = address(0x08abE45e2bb306Eac696A2Da52F6E9684faBdc38);
        addrs[14] = address(0x93c8b165a6A097c8B8bB4bF2a59E185b3af5b08d);
        addrs[15] = address(0x73fFE63cd7D64bd42800C6eb3C349F166dde55e4);
        addrs[16] = address(0xc531373ff82305AD85eb1FB25c6EAa949434DF69);
        addrs[17] = address(0x61424Cc3F7bE571D9488F3db078c7D08e321BAE4);
        addrs[18] = address(0x3422D5CCCbE829f22B2ceBA9691B5df883A80301);
        addrs[19] = address(0x09dEaa41414f6d4dFdeE3ba226E6cd943c48648C);
        addrs[20] = address(0x001FEf24f1D65b439cA21a7F118a3FA3D05c2fA8);
        addrs[21] = address(0xB0D8787e490aC2dA40A769D734aee9aa00b9BDc5);
        addrs[22] = address(0xb92541fEa00f413789b4EfC4ad536cefb1fC5CAe);
        addrs[23] = address(0xC3696182e4672A695cB3FA197647081549C9061e);
        addrs[24] = address(0x54f252F92D58Bd5c3a31c40B71cab59b8Bc85cd4);
        addrs[25] = address(0x1B2f066126475d61bb7a24261Ac30EAB00d84c40);
    }
}
