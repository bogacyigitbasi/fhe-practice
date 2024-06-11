/// npx tsx src/IdentityRegistry/removeRegistrar.ts


const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');
// signer
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.IDENTITY_REGISTRY, abi, signer);
const registrar = process.env.ZAMA_PUBLIC_ADDRESS;

const removeRegistrar = async () => {
    const transaction = await contract.removeRegistrar(
        registrar
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
    console.log("Registrar removed")

};

removeRegistrar()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));