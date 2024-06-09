// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.19;

import "fhevm/lib/TFHE.sol";

contract Counter {
    euint32 counter;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function add(bytes calldata encryptedValue) public {
        euint32 value = TFHE.asEuint32(encryptedValue);
        counter = counter + value;
    }

    function getCounter(bytes32 publicKey) public view returns (bytes memory) {
        return TFHE.reencrypt(counter, publicKey);
    }
}
