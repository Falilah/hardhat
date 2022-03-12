//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface Iwura {
    function greet() external view returns (string memory);

    function setGreeting(string memory _greeting) external;
}
