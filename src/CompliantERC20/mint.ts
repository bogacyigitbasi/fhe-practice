/// npx tsx src/CompliantERC20/mint.ts


const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

// abi
const abi = require('../../artifacts/contracts/CompliantERC20.sol/abi.json');

// signer
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const contract = new Contract(process.env.CompliantERC20, abi, signer);

// totalSupply is public
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