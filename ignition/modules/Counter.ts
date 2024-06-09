// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterModule = buildModule("CounterModule", (m: any) => {
    const counter = m.contract("Counter");

    return { counter };
});

module.exports = CounterModule;