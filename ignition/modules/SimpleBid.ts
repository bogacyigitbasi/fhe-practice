// npx hardhat ignition deploy ./ignition/modules/SimpleBid.ts --network zama

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { getInstance, provider } from "../../src/instance";
/*
 The callback passed to `buildModule()` provides a module builder object `m`
 as a parameter. Through this builder object, you access the Module API.
 For instance, you can deploy contracts via `m.contract()`.
*/


// const minBid = async () => {
//     const fhevm: any = await getInstance();

//     const minBid = 4;
//     const encryptedBid = fhevm.encrypt64(minBid);
//     return encryptedBid;

// }
export default buildModule("SimpleBidModule", (m) => {
    // const encBid = minBid();
    //  send ctor params
    const SimpleBidModule = m.contract("SimpleBid",
        ["0x44CA8A4E34979827732428D1716dc6cC9E09Cc55"], {
    });

    return { SimpleBidModule };
});
