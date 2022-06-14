// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Berry is IERC20 {
    string public name = "Berry";
    string public symbol = "BER";
    uint8 public decimals = 10;
    uint16 private initialSupply = 1000000;
    uint256 public override totalSupply;
    address public founder;
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowed;

    constructor() {
        founder = msg.sender;
        _mint(founder, initialSupply* (10 ** decimals)); // 1 million at start
    }

    function balanceOf(address account) override external view returns(uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) override external returns(bool) {
        require(balances[msg.sender] >= amount, "Insufficient funds in balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function allowance(address owner, address spender) override external view returns(uint) {
        return allowed[owner][spender];
    }

    function approve(address spender, uint amount) override external returns(bool) {
        require(balances[msg.sender] >= amount, "Insufficient funds in balance ");

        allowed[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transferFrom(address from, address to, uint amount) override external returns(bool) {
        require(allowed[from][msg.sender] >= amount, "Insufficient funds in allowance");

        allowed[from][msg.sender] -= amount;

        balances[from] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function _mint(address account, uint amount) internal {
        totalSupply += amount;

        balances[account] = amount;

        emit Transfer(0, account, amount);
    }


// Implémenter les méthodes de l'interface



}
