// npx hardhat ignition deploy ./ignition/modules/IdentityRegistry.ts --network zama

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// import { ethers } from "hardhat";
/*
 The callback passed to `buildModule()` provides a module builder object `m`
 as a parameter. Through this builder object, you access the Module API.
 For instance, you can deploy contracts via `m.contract()`.
*/
export default buildModule("IdentityRegistry", (m) => {

    //  send ctor params
    const IdentityRegistryModule = m.contract("IdentityRegistry");

    return { IdentityRegistryModule };
});
