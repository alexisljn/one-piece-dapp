pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Administration is AccessControl {

    address public founder;
    bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");

    constructor() {
        founder = msg.sender;
        _setupRole(ROLE_ADMIN, founder);
        _setRoleAdmin(ROLE_ADMIN, ROLE_ADMIN);
    }

    function grantRole(address account) override external onlyRole(getRoleAdmin(ROLE_ADMIN)) {
        AccessControl.grantRole(ROLE_ADMIN, account);
    }

    function revokeRole(address account) override external onlyRole(getRoleAdmin(ROLE_ADMIN)) {
        require(msg.sender != founder, "founder will always be admin");
        require(msg.sender != account, "You cannot revoke yourself your role admin");

        AccessControl.revokeRole(ROLE_ADMIN, account);
    }

    function hasRole(address account) override external {
        AccessControl.hasRole(ROLE_ADMIN, account);
    }

    function getRoleAdmin() override external {
        AccessControl.getRoleAdmin(ROLE_ADMIN);
    }

    function renounceRole() override external {
        AccessControl.renounceRole(ROLE_ADMIN, msg.sender);
    }

}
