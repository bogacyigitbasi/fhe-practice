/// npx tsx src/CompliantERC20/transfer.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/CompliantERC20.sol/abi.json');
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contractAddress = process.env.CompliantERC20;
const contract = new Contract(contractAddress, abi, signer);

const address2 = process.env.USER_3_PUBLIC_ADDRESS;

const transfer = async () => {
    // encrypted transfer
    const fhevm: any = await getInstance();

    const transferAmount = 1;
    const encryptedTransferAmount = fhevm.encrypt64(transferAmount);

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