/// npx tsx src/SimpleBid/approveBidTokenTransfer.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/CompliantERC20.sol/abi.json');
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);

// contract address to be approved
const contractAddress = process.env.CompliantERC20;
const contract = new Contract(contractAddress, abi, signer);
//
// to give the approve for some amount
const bidContract = process.env.SIMPLE_BID;

const approveBidTokenTransfer = async () => {
    // encrypted transfer
    const fhevm: any = await getInstance();

    const approveAmount = 100;
    const encapproveAmount = fhevm.encrypt64(approveAmount);

    const transaction = await contract['approve(address,bytes)'](bidContract, encapproveAmount);
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);
};

approveBidTokenTransfer()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));