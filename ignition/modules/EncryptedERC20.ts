// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// import { ethers } from "hardhat";
/*
 The callback passed to `buildModule()` provides a module builder object `m`
 as a parameter. Through this builder object, you access the Module API.
 For instance, you can deploy contracts via `m.contract()`.
*/
export default buildModule("EncryptedERC20", (m) => {

    //  send ctor params
    const EncryptedERC20Module = m.contract("EncryptedERC20", ["Token Name", "SYM"], {
    });

    return { EncryptedERC20Module };
});

// const EncryptedERC20Module = buildModule("EncryptedERC20Module", (m: any) => {
//     // const EncryptedERC20 = m.contract("EncryptedERC20");
//     const contractFactory = await ethers.getContractFactory('EncryptedERC20');
//     const contract = await contractFactory.connect(signers.alice).deploy('Naraggara', 'NARA'); // City of Zama's battle
//     await contract.waitForDeployment();


//     return { EncryptedERC20 };
// });
