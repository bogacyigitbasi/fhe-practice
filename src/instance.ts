import { createInstance, getPublicKeyCallParams } from 'fhevmjs';
import { ethers, JsonRpcProvider, Network } from 'ethers';

// fix for weird redeclare block scoped variable error
// export { };

let _instance: any;
const provider = new JsonRpcProvider('https://devnet.zama.ai');

export const getInstance = async (): Promise<any> => {
    if (_instance) return _instance;
    // 1. Get chain id
    const network = await provider.getNetwork(); // 
    const chainId = +network.chainId.toString(); // 
    // Get blockchain public key
    const rawPublicKeyParams = await provider.call(getPublicKeyCallParams());
    const publicKeyParams = ethers.AbiCoder.defaultAbiCoder().decode(["bytes"], rawPublicKeyParams);
    const publicKey = publicKeyParams[0];
    // Create instance
    _instance = createInstance({ chainId, publicKey });
    // console.log("chainId:", chainId, "publicKey", publicKey);
    return _instance;
};

export { provider };

