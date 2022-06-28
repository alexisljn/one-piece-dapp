// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "./interfaces/AdministrationInterface.sol";
import "hardhat/console.sol";

contract Berry is IERC20 {

    using ERC165Checker for address;

    string public name = "Berry";
    string public symbol = "BER";
    uint8 public decimals = 10;
    uint32 constant private INITIAL_SUPPLY = 100000000; // Useful ?
    uint256 public override totalSupply;
    AdministrationInterface private administrationContract;

    address public founder;

    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowed;
    mapping(address => BerryRequest) _pendingBerryRequest;

    struct BerryRequest {
        uint berryAmount;
        uint ethAmount;
        uint startedAt;
    }

    modifier onlyAdmin() {
        require(administrationContract.isAdmin(msg.sender), "Only admins are allowed");
        _;
    }

    event AllowanceChanged(string indexed action, address indexed owner, address indexed spender, uint amount);

    constructor(address administrationContractAddress) {
        setAdministrationContract(administrationContractAddress);

        founder = msg.sender;

        uint initialSupplyInUnit = INITIAL_SUPPLY  * (10 ** decimals);
        _mint(founder, initialSupplyInUnit); // 100 million at start

        console.log("Deployed by: ", msg.sender);
        console.log("Deployed with supply: %s", initialSupplyInUnit);
    }

    function balanceOf(address account) override external view returns(uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) override external returns(bool) {
        require(balances[msg.sender] >= amount, "Lack of funds in balance");

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
        require(balances[msg.sender] >= amount, "Lack of funds in balance");

        allowed[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);
        console.log("Sender: ", msg.sender);
        console.log("Spender: ", spender);
        console.log("Value: %s", amount);
        return true;
    }

    function transferFrom(address from, address to, uint amount) override external returns(bool) {
        require(allowed[from][msg.sender] >= amount, "Lack of funds in allowance");
        require(balances[from] >= amount, "Lack of funds in balance");

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

    function increaseAllowance(address spender, uint amount) external {
        require(balances[msg.sender] >= allowed[msg.sender][spender] + amount, "Lack of funds in balance");

        allowed[msg.sender][spender] += amount;

        emit AllowanceChanged("Increase", msg.sender, spender, amount);
    }

    function decreaseAllowance(address spender, uint amount) external {
        require(allowed[msg.sender][spender] - amount >= 0, "Allowance cannot be lower to 0");

        allowed[msg.sender][spender] -= amount;

        emit AllowanceChanged("Decrease", msg.sender, spender, amount);
    }

    function resetAllowance(address owner, address spender) external {
        allowed[owner][spender] = 0;

        emit AllowanceChanged("Reset", owner, spender, 0);
    }
    function setAdministrationContract(address administrationContactAddress) public onlyAdmin {
        require(administrationContractAddress.supportsInterface(type(AdministrationInterface).interfaceId),
            'Administration contract does not support Administration interface'
        );

        administrationContract = AdministrationInterface(administrationContractAddress);
    }

    function _mint(address account, uint amount) internal {
        totalSupply += amount;

        balances[account] = amount;

        emit Transfer(address(0), account, amount);
    }
}
