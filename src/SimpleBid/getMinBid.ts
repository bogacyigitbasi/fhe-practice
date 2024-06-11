/// npx tsx src/SimpleBid/getMinBid.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

const abi = require('../../artifacts/contracts/SimpleBid.sol/abi.json');

// signer
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);

const contractAddress = process.env.SIMPLE_BID;
const contract = new Contract(contractAddress, abi, signer);

// what is the min bid, need to reimplemented as reencryp using pubKey
const getMinBid = async () => {

    const encryptedMinBid = await contract.getMinBid();
    console.log('Waiting for transaction validation...');
    console.log("Enc min bid", encryptedMinBid);
    // encrypted transfer
    const fhevm: any = await getInstance();

    const decMinBid = fhevm.decrypt(contractAddress, encryptedMinBid);
    console.log("Decrypted min bid", decMinBid);
};

getMinBid()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));