import { ethers } from "ethers";

import Contrats from "./contracts/4002.json";

const supportChainId = 4002;

const RPCS = {
    250: "https://rpc.ftm.tools/",
    4002: "https://rpc.testnet.fantom.network",
    26: "https://mainnet-rpc.icicbchain.org",
    417: "https://testnet-rpc.icicbchain.org",
    1337: "http://localhost:7545",
    31337: "http://localhost:8545/",
};

const providers = {
    // 1: new ethers.providers.JsonRpcProvider(RPCS[1]),
    // 250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
    // 1337: new ethers.providers.JsonRpcProvider(RPCS[1337]),
    // 31337: new ethers.providers.JsonRpcProvider(RPCS[31337])
};


const routerContract = new ethers.Contract(Contrats.router.address, Contrats.router.abi, providers[supportChainId]);
const atariContract = new ethers.Contract(Contrats.atari.address, Contrats.atari.abi, providers[supportChainId]);

const treasuryContract = new ethers.Contract(Contrats.treasury.address, Contrats.treasury.abi, providers[supportChainId]);

const stakingPoolAbi = Contrats.stakingPool.abi

export {
    providers, routerContract, atariContract, treasuryContract, supportChainId, stakingPoolAbi
}