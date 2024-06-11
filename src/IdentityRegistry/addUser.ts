/// npx tsx src/IdentityRegistry/addUser.ts


const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";
const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');


// only registrar can add a user
const registrar = new Wallet(process.env.REGISTRAR_PRIVATE_KEY, provider);
const contract = new Contract(process.env.IDENTITY_REGISTRY, abi, registrar);
const address2 = process.env.USER_3_PUBLIC_ADDRESS;

const addDid = async () => {
    const transaction = await contract.addDid(
        address2
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
    console.log("User DID created.")

};
addDid()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));