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

    function grantAdmin(address account) external onlyRole(getRoleAdmin(ROLE_ADMIN)) {
        AccessControl.grantRole(ROLE_ADMIN, account);
    }

    function revokeAdmin(address account) external onlyRole(getRoleAdmin(ROLE_ADMIN)) {
        require(account != founder, "founder will always be admin");
        require(msg.sender != account, "You cannot revoke your role admin");

        AccessControl.revokeRole(ROLE_ADMIN, account);
    }

    function isAdmin(address account) public view returns(bool) {
        return AccessControl.hasRole(ROLE_ADMIN, account);
    }

    function getRoleAdminOfRoleAdmin() external view returns(bytes32) {
        return AccessControl.getRoleAdmin(ROLE_ADMIN);
    }

    function renounceRoleAdmin() external {
        require(msg.sender != founder, "founder cannot renounce to role admin");

        AccessControl.renounceRole(ROLE_ADMIN, msg.sender);
    }

}
