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
        ["0x6ED85b016595aC52d906BE57BC206C25ba4C9a56",
            "0x239b6E9bfb054775249CDD34ad7218Db66Dba46C",
            "COM_NAME", "COM_SYM"], {
    });

    return { CompliantERC20Module };
});
