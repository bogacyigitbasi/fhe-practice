/// npx tsx src/IdentityRegistry/setIdentifier.ts


const { Wallet, Contract } = require('ethers');
// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";
// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');

const registrar = new Wallet(process.env.REGISTRAR_PRIVATE_KEY, provider);
const contract = new Contract(process.env.IDENTITY_REGISTRY, abi, registrar);
const address2 = process.env.USER_3_PUBLIC_ADDRESS;

const setIdentifier = async () => {
    // generate public key for re-encrpytion after seeing it
    // using fhevm
    const fhevm: any = await getInstance();
    // adding birthdate as an identifier and the value encrypted.
    const encryptedBirth = fhevm.encrypt64(16);
    const transaction2 = await contract.setIdentifier(
        address2,
        'age',
        encryptedBirth,
    );

    await provider.waitForTransaction(transaction2.hash);
    console.log("Identifier age added");


};
setIdentifier()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));