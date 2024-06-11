/// npx tsx src/ERC20Rules/getRuleIdentifiers.ts

const { Wallet, Contract } = require('ethers');

import { getInstance, provider } from "../instance";
import "dotenv/config";

const abi = require('../../artifacts/contracts/ERC20Rules.sol/abi.json');
// signer
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.ERC20_RULES, abi, signer);

// which identifier is applicable? 
const getIdentifier = async () => {

    console.log('Calling contract');
    const identifier = await contract.getIdentifiers();

    console.log('name: ', identifier);

    console.log('Waiting for transaction validation...');
};

getIdentifier()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));