import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};
import "dotenv/config";

export default config;


const { vars } = require("hardhat/config");

const ZAMA_PK = process.env.ZAMA_PRIVATE_KEY;//vars.get("2a95edfc32be582d3f1b6a33ce39f7b49219b2ded2e1d9a99ef4934f3418096d");

module.exports = {
  solidity: "0.8.24",
  networks: {
    zama: {
      url: process.env.ZAMA_JSON_RPC,
      accounts: [ZAMA_PK],
    }
  }
}