// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "abdk-libraries-solidity/ABDKMath64x64.sol";
import "./interfaces/AdministrationInterface.sol";
import "hardhat/console.sol";

contract Berry is IERC20 {

    using ERC165Checker for address;

    string public name = "Berry";
    string public symbol = "BER";
    uint8 public decimals = 10;
    uint32 constant private _BERRY_PER_DOLLAR = 1000000;
    uint256 public override totalSupply;
    AdministrationInterface private _administrationContract;
    AggregatorV3Interface private _aggregatorV3Contract;

    address public founder;

    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowed;
    mapping(address => BerryRequest) _pendingBerryRequest;

    struct BerryRequest {
        uint berryAmount;
        int128 ethAmount;
        uint startedAt;
    }

    modifier onlyAdmin() {
        require(_administrationContract.isAdmin(msg.sender), "Only admins are allowed");
        _;
    }

    event AllowanceChanged(string indexed action, address indexed owner, address indexed spender, uint amount);

    event BerryRequestCreated(address indexed buyer, uint amount, int128 priceInDollar, int128 princeInEth, int dollarsPerEth, uint8 decimals);

    constructor(address administrationContractAddress, address aggregatorV3Address) {
        _setAdministrationContract(administrationContractAddress);
        _setAggregatorV3Contract(aggregatorV3Address);
        founder = msg.sender;

        balances[founder] = 10000000 * 10**10; //10 millions pour le test
        console.log("Deployed by: ", msg.sender);
        console.log("Admin contrac:", administrationContractAddress);

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

    function getBerryPrice(uint amount) external {
        int dollarsPerEth = _getEthUsdPrice();
        uint8 ethDecimals = _getEthDecimals();

        int128 priceInDollar = ABDKMath64x64.divu(amount,_BERRY_PER_DOLLAR);
        int128 priceInEth = ABDKMath64x64.divi(int256(priceInDollar), dollarsPerEth);

        _pendingBerryRequest[msg.sender] = BerryRequest(amount * 10**decimals, priceInEth, block.timestamp);

        emit BerryRequestCreated(msg.sender, amount, priceInDollar, priceInEth, dollarsPerEth, ethDecimals);
    }

    //TODO Implement later
//    function payForBerry() payable external;

    //TODO Implement later
//    receive() payable external;

    //TODO Implement later
//    function withDrawEth() external onlyAdmin;

    function setAdministrationContract(address administrationContractAddress) public onlyAdmin {
        _setAdministrationContract(administrationContractAddress);
    }

    function _setAdministrationContract(address administrationContractAddress) internal {
        require(administrationContractAddress.supportsInterface(type(AdministrationInterface).interfaceId),
            'Administration contract does not support Administration interface'
        );

        _administrationContract = AdministrationInterface(administrationContractAddress);
    }

    function setAggregatorV3Contract(address aggregatorV3Address) public onlyAdmin {
        _setAggregatorV3Contract(aggregatorV3Address);
    }

    function _setAggregatorV3Contract(address aggregatorV3Address) internal {
        _aggregatorV3Contract = AggregatorV3Interface(aggregatorV3Address);
    }

    function _getEthUsdPrice() private view returns(int) {
        (,int price,,,) = _aggregatorV3Contract.latestRoundData();
        return price;
    }

    function _getEthDecimals() private view returns(uint8) {
        return _aggregatorV3Contract.decimals();
    }

    //TODO Implement later
//    function _createBerryRequest() private;

    //TODO Implement later
//    function _checkBerryRequest() private;

    function _mint(address account, uint amount) internal {
        totalSupply += amount;

        balances[account] = amount;

        emit Transfer(address(0), account, amount);
    }
}
