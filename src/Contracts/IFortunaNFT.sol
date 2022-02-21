// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IFortunaNFT {
    function raffleMint (address to, string memory uri) external;
}