/// npx tsx src/EncryptedERC20/view.ts 

const { Wallet, Contract } = require('ethers');

// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/EncryptedERC20.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.ENCRYPTEDERC20_CONTRACT_ADDRESS, abi, signer);


const getTokenInfo = async () => {
    // const fhevm: any = await getInstance();
    console.log("have the instance");
    // generate public key for re-encrpytion after seeing it

    console.log('Calling contract');
    const name = await contract.name();
    const symbol = await contract.symbol();

    console.log('name: ', name, 'symbol: ', symbol);

    console.log('Waiting for transaction validation...');
    // await provider.waitForTransaction(transaction.hash);
};

getTokenInfo()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));