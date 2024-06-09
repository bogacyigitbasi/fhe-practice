/// npx tsx src/EncryptedERC20/mint.ts 


const { Wallet, Contract } = require('ethers');
// const { getInstance, provider } = require('./instance.ts');
import { getInstance, provider } from "../instance";
// const hre = require('hardhat'); //will get abi here
import "dotenv/config";
// const { vars } = require("hardhat/config");
const abi = require('../../artifacts/contracts/EncryptedERC20.sol/abi.json');

const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.ENCRYPTEDERC20_CONTRACT_ADDRESS, abi, signer);


const mint = async () => {
    const fhevm: any = await getInstance();
    console.log("have the instance");
    const amount = 1000;
    const transaction = await contract.mint(
        amount
    );
    console.log('Waiting for transaction validation...');
    await provider.waitForTransaction(transaction.hash);

    const totalSupply = await contract.totalSupply();
    console.log('Total Supply', totalSupply);

    const balanceOfMe = await contract.balanceOfMe();
    console.log('Encrypted balanceOfMe', balanceOfMe);
};

mint()
    .then(() => {
        console.log('Transaction done!');
    })
    .catch((err) => console.log('Transaction failed :(', err));