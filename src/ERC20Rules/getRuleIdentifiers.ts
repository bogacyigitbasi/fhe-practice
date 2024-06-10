/// npx tsx src/ERC20Rules/getRuleIdentifiers.ts

const { Wallet, Contract } = require('ethers');

// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/ERC20Rules.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.ERC20_RULES, abi, signer);


const getIdentifier = async () => {

    console.log('Calling contract');
    const identifier = await contract.getIdentifiers();

    console.log('name: ', identifier);

    console.log('Waiting for transaction validation...');
    // await provider.waitForTransaction(identifier.hash);
};

getIdentifier()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));