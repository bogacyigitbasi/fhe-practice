/// npx tsx src/SimpleBid/bidClaim.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/SimpleBid.sol/abi.json');
// anybody can bid
const signer = new Wallet(process.env.USER_2_PRIVATE_KEY, provider);
const contractAddress = process.env.SIMPLE_BID;
const contract = new Contract(contractAddress, abi, signer);

const bidClaim = async () => {
    // encrypted transfer
    const fhevm: any = await getInstance();

    const minBidAmount = 7;
    const encMinBid = fhevm.encrypt64(minBidAmount);

    const transaction = await contract.bid_claim(
        encMinBid,
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
};

bidClaim()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));