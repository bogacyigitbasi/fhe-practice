// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "../abstract/Reencrypt.sol";

import "./CompliantERC20.sol";

// for demo purposes no endTime, no highestbid
contract BlindAuction is Reencrypt {
    // any bid higher will get a token
    euint64 internal atLeastBid;

    // The token contract used for encrypted bids.
    EncryptedERC20 public tokenContract;

    // The owner of the contract.
    address public contractOwner;

    constructor(EncryptedERC20 _tokenContract) {
        tokenContract = _tokenContract;
        contractOwner = msg.sender;
    }

    // Bid an `encryptedValue`.
    function bid_claim(bytes calldata encryptedValue) public {
        euint64 value = TFHE.asEuint64(encryptedValue);

        if (TFHE.isInitialized(atLeastBid)) {
            ebool isHigher = TFHE.lt(atLeastBid, value);
            euint64 toTransfer = value - atLeastBid;
            // Transfer only if bid is higher, also to avoid overflow from previous line
            euint64 amount = TFHE.select(
                isHigher,
                toTransfer,
                TFHE.asEuint64(0)
            );
            tokenContract.transferFrom(contractOwner, msg.sender, amount);
        } else {
            revert("It is not initialized.");
        }
    }
}
