// npx hardhat ignition deploy ./ignition/modules/CompliantERC20.ts --network zama

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
// import { ethers } from "hardhat";
/*
 The callback passed to `buildModule()` provides a module builder object `m`
 as a parameter. Through this builder object, you access the Module API.
 For instance, you can deploy contracts via `m.contract()`.
*/

export default buildModule("CompliantERC20", (m) => {

    //  send ctor params
    const CompliantERC20Module = m.contract("CompliantERC20",
        ["0x3949753b86798d361911b3A819A0722Fcba12747",
            "0x05Fc3C9361eC0d1F6Ed50895Cb53c463D7de99Af",
            "COM_NAME", "COM_SYM"], {
    });

    return { CompliantERC20Module };
});
