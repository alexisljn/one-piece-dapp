// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

// Mettre des _ pour les attributs/fonctions private et internal
contract Berry is IERC20 {
    string public name = "Berry";
    string public symbol = "BER";
    uint8 public decimals = 10;
    uint32 private initialSupply = 1000000;
    uint256 public override totalSupply;
    address public founder;
    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowed;

    constructor() {
        founder = msg.sender;
        uint initialSupplyInUnit = initialSupply  * (10 ** decimals);
        _mint(founder, initialSupplyInUnit); // 1 million at start

        console.log("Deployed by: ", msg.sender);
        console.log("Deployed with supply: %s", initialSupplyInUnit);
    }

    function balanceOf(address account) override external view returns(uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) override external returns(bool) {
        require(balances[msg.sender] >= amount, "Insufficient funds in balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
        console.log("Sender: ", msg.sender);
        console.log("Receiver: ", to);
        console.log("Value: %s", amount);
        return true;
    }

    function allowance(address owner, address spender) override external view returns(uint) {
        return allowed[owner][spender];
    }

    function approve(address spender, uint amount) override external returns(bool) {
        require(balances[msg.sender] >= amount, "Insufficient funds in balance");

        allowed[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        console.log("Sender: ", msg.sender);
        console.log("Spender: ", spender);
        console.log("Value: %s", amount);
        return true;
    }

    function transferFrom(address from, address to, uint amount) override external returns(bool) {
        require(allowed[from][msg.sender] >= amount, "Insufficient funds in allowance");
        require(balances[from] >= amount, "Insufficient funds in balance");

        allowed[from][msg.sender] -= amount;

        // call à transfer non ?

        balances[from] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
        console.log("Sender: ", from);
        console.log("Spender: ", msg.sender);
        console.log("Receiver: ", to);
        console.log("Value: %s", amount);

        return true;
    }

    function _mint(address account, uint amount) internal {
        totalSupply += amount;

        balances[account] = amount;

        emit Transfer(address(0), account, amount);
    }
}
