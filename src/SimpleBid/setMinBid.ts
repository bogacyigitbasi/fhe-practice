/// npx tsx src/SimpleBid/setMinBid.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

const abi = require('../../artifacts/contracts/SimpleBid.sol/abi.json');
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);

const contractAddress = process.env.SIMPLE_BID;
const contract = new Contract(contractAddress, abi, signer);

// we need to initiate the minimum bid amount 
// otherwise it will fail
const setMinBid = async () => {
    // encrypted transfer
    const fhevm: any = await getInstance();

    const minBidAmount = 4;
    const encMinBid = fhevm.encrypt64(minBidAmount);

    const transaction = await contract.setMinBid(
        encMinBid,
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
};

setMinBid()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));