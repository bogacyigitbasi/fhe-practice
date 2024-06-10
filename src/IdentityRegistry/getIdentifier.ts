/// npx tsx src/IdentityRegistry/getIdentifier.ts


const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";
const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.IDENTITY_REGISTRY, abi, signer);

const address2 = process.env.USER_2_PUBLIC_ADDRESS;
const contractAddress = process.env.IDENTITY_REGISTRY;
const getIdentifier = async () => {
    const encryptedIdentifier = await contract.getIdentifier(address2, "age");
    console.log("identifier", encryptedIdentifier);
    // generate public key for re-encrpytion after seeing it
    // using fhevm
    const fhevm: any = await getInstance();
    console.log('Decrypted Value', fhevm.decrypt(contract.getAddress(), encryptedIdentifier));
};
getIdentifier()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));