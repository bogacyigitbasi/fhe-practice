/// npx tsx src/CompliantERC20/balanceOf.ts 

const { Wallet, Contract } = require('ethers');
import { getInstance, provider } from "../instance";
import "dotenv/config";

const abi = require('../../artifacts/contracts/CompliantERC20.sol/abi.json');
// signer
const signer = new Wallet(process.env.ZAMA_PRIVATE_KEY, provider);
const sender = process.env.ZAMA_PUBLIC_ADDRESS;
// contract
const contractAddress = process.env.CompliantERC20;
const contract = new Contract(contractAddress, abi, signer);
// receiver balance
const address2 = process.env.USER_2_PUBLIC_ADDRESS;
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