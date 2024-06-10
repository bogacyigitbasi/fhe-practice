const { Wallet, Contract } = require('ethers');
// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/Counter.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.COUNTER_CONTRACT_ADDRESS, abi, signer);


const add = async () => {
    const fhevm: any = await getInstance();
    console.log("have the instance");

    const addAmount = fhevm.encrypt32(5);
    console.log('Calling contract value', addAmount);
    const transaction = await contract.add(
        addAmount
    );

    // console.log('Decrypting result using private key');
    // return balance;
    // const transaction = await contract.getCounter();

    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
};

add()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));