pragma solidity ^0.8.0;

abstract contract AdministrationInterface {
    function isAdmin(address account) virtual external view returns(bool);
}
