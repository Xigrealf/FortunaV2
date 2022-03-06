// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IStable {
    function approve (address spender, uint256 amount) external;

    function transfer (address recipient, uint256 amount) external;

    function transferFrom (address sender, address recipient, uint256 amount) external;
}