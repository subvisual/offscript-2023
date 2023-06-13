// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/StdMath.sol";

import {OffscriptPayment} from "contracts/Payment.sol";

contract PaymentTest is Test {
    uint256 fork;
    string MAINNET_RPC_URL = vm.envString("MAINNET_RPC_URL");

    address usdc = address(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    address usdt = address(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    address dai = address(0x6B175474E89094C44Da98b954EedeAC495271d0F);

    OffscriptPayment payment;

    function setUp() public {
        fork = vm.createFork(MAINNET_RPC_URL, 17430000);
        vm.selectFork(fork);

        OffscriptPayment.PaymentTokenParams[] memory tokens = new OffscriptPayment.PaymentTokenParams[](3);
        tokens[0] = OffscriptPayment.PaymentTokenParams({
            token: usdc,
            oracle: address(0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6)
        });
        tokens[1] = OffscriptPayment.PaymentTokenParams({
            token: usdt,
            oracle: address(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D)
        });
        tokens[2] = OffscriptPayment.PaymentTokenParams({
            token: dai,
            oracle: address(0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9)
        });

        payment = new OffscriptPayment(tokens, 800, 20, 10);
    }

    function test_values() public {
        assertEq(address(payment.oracles(dai)), address(0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9));
        assertEq(address(payment.oracles(usdc)), address(0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6));
        assertEq(address(payment.oracles(usdt)), address(0x3E7d1eAB13ad0104d2750B8863b489D65364e32D));
        assertEq(payment.price(), 800);
        assertEq(payment.discountPct(), 20);
        assertEq(payment.supply(), 10);
    }

    function test_getBasePrice() public view {
        uint256 price;

        // usdc
        price = payment.getBasePrice(usdc);
        assert(stdMath.delta(price, 800e6) < 2e6);

        // usdt
        price = payment.getBasePrice(usdt);
        assert(stdMath.delta(price, 800e6) < 2e6);

        // dai
        price = payment.getBasePrice(dai);
        assert(stdMath.delta(price, 800 ether) < 2 ether);
    }

    function test_getPriceForBuyer() public {
        uint256 price;

        address[] memory whitelist = new address[](1);
        whitelist[0] = address(this);

        // usdc before whitelist
        price = payment.getPriceForBuyer(address(this), usdc);
        assert(stdMath.delta(price, 800e6) < 2e6);

        // usdt before whitelist
        price = payment.getPriceForBuyer(address(this), usdt);
        assert(stdMath.delta(price, 800e6) < 2e6);

        // dai before whitelist
        price = payment.getPriceForBuyer(address(this), dai);
        assert(stdMath.delta(price, 800 ether) < 2 ether);

        payment.addToWhitelist(whitelist);

        // usdc after whitelist
        price = payment.getPriceForBuyer(address(this), usdc);
        assert(stdMath.delta(price, 640e6) < 2e6);

        // usdt after whitelist
        price = payment.getPriceForBuyer(address(this), usdt);
        assert(stdMath.delta(price, 640e6) < 2e6);

        // dai after whitelist
        price = payment.getPriceForBuyer(address(this), dai);
        assert(stdMath.delta(price, 640 ether) < 2 ether);
    }
}
