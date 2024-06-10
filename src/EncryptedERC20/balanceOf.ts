/// npx tsx src/EncryptedERC20/balanceOf.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/EncryptedERC20.sol/abi.json');
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const sender = process.env.ZAMA_PUBLIC_ADDRESS;
const contractAddress = process.env.ENCRYPTEDERC20_CONTRACT_ADDRESS;
const contract = new Contract(contractAddress, abi, signer);

const address2: String = '0xD3e855Fa9564f747571C4324695c20AAC726B1Ad';
const balanceOf = async () => {
    // generate public key for re-encrpytion after seeing it
    // using fhevm
    const fhevm: any = await getInstance();
    // generate public key for re-encrpytion after seeing it
    console.log('PubKey is being generated');
    const pubKey = fhevm.generatePublicKey({
        verifyingContract: contractAddress
    });
    console.log("PubKey is generated");

    // we need to sign the key 
    const signature = await signer.signTypedData(
        pubKey.eip712.domain,
        { Reencrypt: pubKey.eip712.types.Reencrypt },
        pubKey.eip712.message
    );

    // calling contract
    const decryptedBalanceOfSender = await contract.balanceOf(sender, pubKey.publicKey, signature);
    console.log('Sender Balance', fhevm.decrypt(contractAddress, decryptedBalanceOfSender));
    const decryptedBalanceOfAnotherAddresss = await contract.balanceOf(address2, pubKey.publicKey, signature);
    console.log('Addr2 Balance', fhevm.decrypt(contractAddress, decryptedBalanceOfAnotherAddresss));
};

balanceOf()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));