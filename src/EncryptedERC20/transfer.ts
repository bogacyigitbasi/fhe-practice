/// npx tsx src/EncryptedERC20/transfer.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/EncryptedERC20.sol/abi.json');
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contractAddress = process.env.ENCRYPTEDERC20_CONTRACT_ADDRESS;
const contract = new Contract(contractAddress, abi, signer);

const address2: String = '0xD3e855Fa9564f747571C4324695c20AAC726B1Ad';
/// account address 2: 0xD3e855Fa9564f747571C4324695c20AAC726B1Ad

const transfer = async () => {
    // encrypted transfer
    const fhevm: any = await getInstance();

    const transferAmount = 10;
    const encryptedTransferAmount = fhevm.encrypt64(transferAmount);
    // calling contract. transfer caused ambiguity error
    // const transaction = await contract.transfer(address2, encryptedTransferAmount);
    // explicitly refer to the right transfer function
    console.log('Encrypted transfer initiated...');
    const transaction = await contract['transfer(address,bytes)'](address2, encryptedTransferAmount);
    //validate/revert
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);

};

transfer()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));