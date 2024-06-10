// npx hardhat ignition deploy ./ignition/modules/ERC20Rules.ts --network zama

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20RulesModule = buildModule("ERC20RulesModule", (m: any) => {
    const ERC20Rules = m.contract("ERC20Rules");

    return { ERC20Rules };
});

module.exports = ERC20RulesModule;