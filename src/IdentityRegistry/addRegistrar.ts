/// npx tsx src/IdentityRegistry/addRegistrar.ts


const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";

import "dotenv/config";

const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');

// signer
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.IDENTITY_REGISTRY, abi, signer);

// created a separate account for registrar to manage easily
const registrar = process.env.REGISTRAR_PUBLIC_ADDRESS;
const addRegistrar = async () => {
    const transaction = await contract.addRegistrar(
        registrar, 1
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
    console.log("Registrar added")

};

addRegistrar()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));