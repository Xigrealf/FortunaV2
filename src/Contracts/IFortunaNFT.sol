// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IFortunaNFT {

    function lotteryMint (address to, string memory uri) external returns(uint256);
}