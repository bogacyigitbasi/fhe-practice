/// npx tsx src/IdentityRegistry/grantAccess.ts

const { Wallet, Contract } = require('ethers');

import { getInstance, provider } from "../instance";

import "dotenv/config";

const abi = require('../../artifacts/contracts/IdentityRegistry.sol/abi.json');


/// User will give access to registrar to operate on his identity info
// const address2 = process.env.USER_2_PUBLIC_ADDRESS;
const signer2 = new Wallet(process.env.USER_2_PRIVATE_KEY, provider);
const contractIdentityRegistry = new Contract(process.env.IDENTITY_REGISTRY, abi, signer2);

// will check the access and value with registrar
const registrar = process.env.REGISTRAR_PUBLIC_ADDRESS;

const grantAccess = async () => {
    // allow sender to operate on the attribute/identifier
    // for the sake of simplicity its the same with registrar
    const transaction = await contractIdentityRegistry.grantAccess(registrar, ["age"]);
    await provider.waitForTransaction(transaction.hash);
    console.log("Grant has been given to registrar");

    // reencrypt 
    // generate public key for re-encrpytion after seeing it
    // using fhevm if its needed

    // const fhevm: any = await getInstance();

    // const pubKey = fhevm.generatePublicKey({
    //     verifyingContract: contract
    // });
    // console.log("PubKey is generated");

    // // we need to sign the key 
    // const signature = await signerRegistrar.signTypedData(
    //     pubKey.eip712.domain,
    //     { Reencrypt: pubKey.eip712.types.Reencrypt },
    //     pubKey.eip712.message
    // );

    // const age = await contract.reencryptIdentifier(signer, "age", pubKey.publicKey, signature);
    // console.log("Encrypted birthdate", age)


};
grantAccess()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));