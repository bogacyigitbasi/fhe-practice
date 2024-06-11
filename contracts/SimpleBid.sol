// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";
import "../abstract/Reencrypt.sol";

import "./CompliantERC20.sol";

// for demo purposes no endTime, no highestbid
contract SimpleBid is Reencrypt {
    // any bid higher will get a token
    euint64 internal minBidAmount;

    // The token contract used for encrypted bids.
    EncryptedERC20 public tokenContract;

    // The owner of the contract.
    address public contractOwner;

    constructor(EncryptedERC20 _tokenContract) {
        tokenContract = _tokenContract;
        contractOwner = msg.sender;
    }
    function setMinBid(bytes calldata _atleastBid) public onlyContractOwner {
        minBidAmount = TFHE.asEuint64(_atleastBid);
    }

    function getMinBid() public view returns (euint64) {
        return minBidAmount;
    }
    // Bid an `encryptedValue`.
    function bid_claim(bytes calldata encryptedValue) public {
        euint64 value = TFHE.asEuint64(encryptedValue);

        if (TFHE.isInitialized(minBidAmount)) {
            ebool isHigher = TFHE.lt(minBidAmount, value);
            euint64 toTransfer = value - minBidAmount;
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

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner);
        _;
    }
}
