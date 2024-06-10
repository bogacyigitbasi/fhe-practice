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
const registrar = process.env.ZAMA_PUBLIC_ADDRESS;
const address2: String = '0xD3e855Fa9564f747571C4324695c20AAC726B1Ad';

const addRegistrar = async () => {
    const transaction = await contract.removeRegistrar(
        registrar
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
    console.log("Registrar removed")

};

addRegistrar()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));