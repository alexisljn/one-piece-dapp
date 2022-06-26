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

    function revokeRoleAdmin(bytes32 role, address account) external {
        require(msg.sender != founder, "founder will always be admin");
        require(msg.sender != account, "You cannot revoke yourself your role admin");

        revokeRole(role, account);
    }
}
