// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "../abstract/Reencrypt.sol";
import "./IdentityRegistry.sol";

interface ICompliantERC20 {
    function getIdentifier(
        address wallet,
        string calldata identifier
    ) external view returns (euint64);
}

contract ERC20Rules {
    string[] public identifiers;

    mapping(address => uint64) public whitelistedWallets;

    constructor() {
        identifiers = ["age"];
    }
    function getIdentifiers() public view returns (string[] memory) {
        return identifiers;
    }

    function transfer(address to) public view returns (ebool) {
        ICompliantERC20 erc20 = ICompliantERC20(msg.sender);

        ebool condition = checkAge(erc20, to);

        return condition;
    }

    function checkAge(
        ICompliantERC20 erc20,
        address to
    ) internal view returns (ebool) {
        euint64 age = erc20.getIdentifier(to, "age");
        uint64 atLeast = 18;
        require(TFHE.isInitialized(age), "You don't have access");
        ebool condition = TFHE.gt(age, TFHE.asEuint64(atLeast));
        return condition;
    }
}
