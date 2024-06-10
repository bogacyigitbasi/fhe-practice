/// npx tsx src/IdentityRegistry/addRegistrar.ts


const { Wallet, Contract } = require('ethers');
// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";
// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.IDENTITY_REGISTRY, abi, signer);
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