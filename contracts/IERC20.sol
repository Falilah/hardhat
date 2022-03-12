// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

interface IERC20 {
    function balanceOf(address bal) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function approve(address _spender, uint256 _value) external;
}
