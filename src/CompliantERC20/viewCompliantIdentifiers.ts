/// npx tsx src/CompliantERC20/viewCompliantIdentifiers.ts

const { Wallet, Contract } = require('ethers');

// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/CompliantERC20.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.CompliantERC20, abi, signer);
const addr2 = process.env.USER_2_PUBLIC_ADDRESS;

const getIdentifier = async () => {

    console.log('Calling contract');
    const ruleIdentifiers = await contract.identifiers();
    console.log("Rule Identifier", ruleIdentifiers);


    const idIdentifierValueEncrypted = await contract.getIdentifier(addr2, "age");
    console.log("Encrypted ID Reg Identifier", idIdentifierValueEncrypted);

    // const fhevm = await getInstance();
    // console.log('identifiers: ', fhevm.decrypt(contract.getAddress(), idIdentifierValueEncrypted));

    // console.log('Waiting for transaction validation...');
    // await provider.waitForTransaction(identifier.hash);
};

getIdentifier()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));