// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {SafeERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC721} from "lib/openzeppelin-contracts/contracts/token/ERC721/IERC721.sol";

import {AggregatorV3Interface} from "lib/chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// TODO: still needed?
// import {IOffscript2023} from "./IOffscript2023.sol";
import "./errors.sol";

contract OffscriptPayment is Ownable {
    //
    // Libraries
    //
    using SafeERC20 for IERC20;

    //
    // Structs
    //
    struct PaymentTokenParams {
        address token;
        AggregatorV3Interface oracle;
    }

    //
    // Events
    //

    /// On every new payment
    event Payment(address indexed payer, uint256 indexed nftId, address indexed tokenId, bool extended, uint256 amount);

    //
    // State
    //
    IERC20 public dai;
    IERC20 public usdt;
    IERC20 public usdc;

    /// NFT contract TODO: still needed?
    // IOffscript2023 public nft;

    // base ticket price, in USD
    uint16 public basePrice;
    uint16 public extendedPrice;

    //Ticket Supply
    uint16 public supply;
    uint16 public sold;

    /// Discount percentage (1% == 100)
    uint16 discountPct;

    /// tokens and price oracles
    mapping(address => AggregatorV3Interface) public oracles;

    mapping(uint256 => bool) public used;

    constructor(
        PaymentTokenParams[] memory tokens,
        // TODO: still needed?
        // IOffscript2023 _nft,
        uint16 _basePrice,
        uint16 _extendedPrice,
        uint16 _discountPct,
        uint16 _supply
    ) Ownable() {
        if (_discountPct == 0 || _discountPct >= 10000) {
            revert InvalidArguments();
        }

        for (uint256 i = 0; i < tokens.length; i++) {
            oracles[tokens[i].token] = tokens[i].oracle;
        }

        basePrice = _basePrice;
        extendedPrice = _extendedPrice;
        discountPct = _discountPct;

        supply = _supply;
    }

    //
    // Public API
    //

    /// Checks whether an address is whitelisted for a discount
    /// @param _addr Address to check
    /// @return true if whitelisted, false if not
    function checkWhitelist(address _addr) internal view returns (bool) {
        // TODO:
        return false;
    }

    /// Purchase a ticket with ETH
    /// @param _extended Whether to purchase an extended ticket
    function payWithEth(bool _extended) external payable {
        if (sold == supply) {
            revert Depleted();
        }

        uint256 price = getPriceForBuyer(msg.sender, address(0), _extended);

        if (msg.value < price) {
            revert NotEnoughPayment();
        }
        // refund excess
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        sold++;
        emit Payment(msg.sender, 0, /*tokenId*/ address(0), _extended, price);
    }

    /// Purchase a ticket with ERC20
    /// @param _token The payment token to use. Must be in the oracle map
    /// @param _extended Whether to purchase an extended ticket
    function payWithERC20(address _token, bool _extended) external {
        if (sold == supply) {
            revert Depleted();
        }

        AggregatorV3Interface oracle = oracles[_token];
        if (address(oracle) == address(0x0)) {
            revert InvalidArguments();
        }

        uint256 price = getPriceForBuyer(msg.sender, _token, _extended);

        sold++;
        IERC20(_token).safeTransferFrom(msg.sender, address(this), price);
        emit Payment(msg.sender, 0, /*tokenId*/ _token, _extended, price);
    }

    /// Gets the base price of a ticket, without considering whitelist discount
    /// @param _token Purchase token. 0x0 if ETH
    /// @param _extended Whether to get the price for an extended ticket
    /// @return price expressed in {_token}
    function getBasePrice(address _token, bool _extended) public view returns (uint256) {
        AggregatorV3Interface oracle = oracles[_token];

        if (address(oracle) == address(0)) {
            revert InvalidArguments();
        }

        uint256 decimals = 18;

        if (_token != address(0x0)) {
            decimals = IERC20Metadata(_token).decimals();
        }

        (, int256 price,,,) = oracle.latestRoundData();
        uint256 usdPrice = _extended ? extendedPrice : basePrice;

        return
            (((usdPrice * 10 ** (oracle.decimals() * 2)) / uint256(price)) * 10 ** decimals) / 10 ** oracle.decimals();
    }

    /// Gets the price of a ticket, after considering a possible whitelist discount
    /// @param _buyer the potential buyer address
    /// @param _token Purchase token. 0x0 if ETH
    /// @param _extended Whether to get the price for an extended ticket
    /// @return price expressed in {_token}
    function getPriceForBuyer(address _buyer, address _token, bool _extended) public view returns (uint256 price) {
        price = getBasePrice(_token, _extended);

        if (checkWhitelist(_buyer)) {
            uint256 discount = price * discountPct / 100;
            price -= discount;
        }

        // TODO: check whitelist and apply discount
    }

    /// Gets the remaining supply of tickets
    function remainingSupply() public view returns (uint16) {
        // may happen if we later change the supply to a lower value
        if (sold >= supply) {
            return 0;
        }

        return supply - sold;
    }

    //
    // Owner API
    //

    /// Collects payments
    function sweep(address[] memory addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == address(0x0) && address(this).balance > 0) {
                payable(msg.sender).transfer(address(this).balance);
            } else {
                IERC20 token = IERC20(addresses[i]);
                uint256 balance = token.balanceOf(address(this));
                if (balance > 0) {
                    token.safeTransfer(msg.sender, balance);
                }
            }
        }
    }

    /// Overrides the available supply
    function setSupply(uint16 _newSupply) public onlyOwner {
        if (_newSupply < sold) {
            revert InvalidArguments();
        }

        supply = _newSupply;
    }
}
