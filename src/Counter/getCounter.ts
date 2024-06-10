const { Wallet, Contract } = require('ethers');
// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/Counter.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.COUNTER_CONTRACT_ADDRESS, abi, signer);


const getCounter = async () => {
    const fhevm: any = await getInstance();
    console.log("have the instance");
    // generate public key for re-encrpytion after seeing it
    console.log('PubKey is being generated');
    const pubKey = fhevm.generatePublicKey({
        verifyingContract: process.env.COUNTER_CONTRACT_ADDRESS
    });
    console.log(pubKey);

    console.log('Calling contract');
    const encCounter = await contract.getCounter(
        pubKey.publicKey
    );


    console.log('Decrypting result using private key');
    const counter = fhevm.decrypt(process.env.COUNTER_CONTRACT_ADDRESS, encCounter);
    // return balance;
    // const transaction = await contract.getCounter();

    console.log('Waiting for transaction validation...');
    console.log('Counter', counter);
    // await provider.waitForTransaction(transaction.hash);
};

getCounter()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));