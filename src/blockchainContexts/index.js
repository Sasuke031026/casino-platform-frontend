/** @format */

import React, {
    createContext,
    useContext,
    useReducer,
    useMemo,
    useEffect,
} from "react";
import { ethers } from "ethers";
import { useWallet } from "use-wallet";
import {
    providers,
    routerContract,
    atariContract,
    treasuryContract,
    supportChainId,
    stakingPoolAbi,
} from "../contracts";
import { toBigNum, fromBigNum } from "../utils/utils";

import { useDispatch } from "react-redux";

import { NotificationManager } from "react-notifications";

const BlockchainContext = createContext();

export function useBlockchainContext() {
    return useContext(BlockchainContext);
}

function reducer(state, { type, payload }) {
    return {
        ...state,
        [type]: payload,
    };
}

const INIT_STATE = {};

export default function Provider({ children }) {
    const appDispatch = useDispatch();
    const wallet = useWallet();
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    // set signer balance
    useEffect(() => {
        const getSigner = async () => {
            if (wallet.status === "connected") {
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();
                dispatch({
                    type: "signer",
                    payload: signer,
                });

                dispatch({
                    type: "provider",
                    payload: provider,
                });

                checkBalance();
                appDispatch({
                    type: "SET_SIGNER",
                    payload: signer,
                });
            }
        };
        getSigner();
    }, [wallet.status]);

    const checkBalance = async () => {
        try {
            if (wallet.status === "connected") {
                const balance = await atariContract.balanceOf(wallet.account);
                dispatch({
                    type: "balance",
                    payload: fromBigNum(balance, 0),
                });
                return fromBigNum(balance, 0);
            } else {
                return "0";
            }
        } catch (err) {
            return 0;
        }
    };

    const checkApproval = async (spenderAdddress) => {
        if (wallet.status === "connected") {
            const signedAtariContract = atariContract.connect(state.signer);
            const allowance = await signedAtariContract.allowance(
                wallet.account,
                spenderAdddress
            );
            return fromBigNum(allowance, 0);
        } else {
            return "0";
        }
    };

    /*  ------------ deposit ------------- */
    const deposit = async (amount) => {
        try {
            if (wallet.status === "connected") {
                const balance = await checkBalance();
                if (balance >= amount) {
                    const allowance = await checkApproval(
                        treasuryContract.address
                    );

                    if (allowance < amount) {
                        const signedAtariContract = atariContract.connect(
                            state.signer
                        );
                        var tx = await signedAtariContract.approve(
                            treasuryContract.address,
                            toBigNum(amount * 100, 0)
                        );
                        await tx.wait();
                    }

                    const signedTreasuryContract = treasuryContract.connect(
                        state.signer
                    );
                    tx = await signedTreasuryContract.deposit(
                        toBigNum(amount, 0)
                    );
                    await tx.wait();

                    return { success: true };
                } else {
                    NotificationManager.error("Insufficent balance", "", 3000);
                    return { success: false };
                }
            }
        } catch (err) {
            NotificationManager.error("Deposit Failed", "", 3000);
            return { success: false };
        }
    };

    /*  ------------ stake ------------- */

    const getStakingPoolInfo = async (poolAddress) => {
        if (wallet.status === "connected")
            try {
                const stakingPool = getStakingContract(poolAddress);

                const stakingAmountPromise = stakingPool.balanceOf(
                    wallet.account
                );
                const totalPromise = stakingPool.totalSupply();
                const poolBalancePromise = atariContract.balanceOf(
                    stakingPool.address
                );
                const symbolPromise = stakingPool.symbol();

                var res = await Promise.all([
                    stakingAmountPromise,
                    totalPromise,
                    poolBalancePromise,
                    symbolPromise,
                ]);
                dispatch({
                    type: [poolAddress],
                    payload: {
                        stakingAmount: Number(res[0]),
                        total: Number(res[1]),
                        poolBalance: Number(res[2]),
                        symbol: res[3],
                    },
                });
            } catch (err) {
                NotificationManager.error(
                    err.message ? err.message : "stake error",
                    "",
                    3000
                );
            }
    };

    const getStakingContract = (poolAddress) => {
        try {
            return new ethers.Contract(
                poolAddress,
                stakingPoolAbi,
                providers[supportChainId]
            );
        } catch (err) {
            return null;
        }
    };

    const stake = async (amount, poolAddress) => {
        if (wallet.status === "connected")
            try {
                const stakingPool = getStakingContract(poolAddress);
                if (Number(state.balance) < Number(amount))
                    throw new Error("insufficent balance");
                const allowance = await checkApproval(stakingPool.address);

                if (allowance < amount) {
                    const signedAtariContract = atariContract.connect(
                        state.signer
                    );
                    var tx = await signedAtariContract.approve(
                        stakingPool.address,
                        toBigNum(amount * 100, 0)
                    );
                    await tx.wait();
                }
                const signedStakingPool = stakingPool.connect(state.signer);
                tx = await signedStakingPool.stake(toBigNum(amount, 0));
                await tx.wait();
                getStakingPoolInfo(poolAddress);
                NotificationManager.success("stake success");
            } catch (err) {
                var errMsg =
                    err.code === -32603 ? err.data.message : err.message;
                NotificationManager.error(
                    errMsg ? errMsg : "stake error",
                    "",
                    3000
                );
            }
        else {
            NotificationManager.error("please connect wallet", "", 3000);
        }
    };

    const unStake = async (amount, poolAddress) => {
        if (wallet.status === "connected")
            try {
                const stakingPool = getStakingContract(poolAddress);
                const stakingAmount = await stakingPool.balanceOf(
                    wallet.account
                );
                if (Number(stakingAmount) > Number(amount)) {
                    const signedStakingPool = stakingPool.connect(state.signer);
                    var tx = await signedStakingPool.unstake(
                        toBigNum(amount, 0)
                    );
                    await tx.wait();
                    getStakingPoolInfo(poolAddress);
                    NotificationManager.success("Withdraw success");
                } else {
                    NotificationManager.error("unStake : insufficent balance");
                }
            } catch (err) {
                NotificationManager.error(
                    err.message ? err.message : "stake error",
                    "",
                    3000
                );
            }
        else {
            NotificationManager.error(" please connect wallet");
        }
    };

    /* ------------- submit -------------- */

    const submitNewGame = async (gameData) => {
        if (wallet.status !== "connected")
            throw new Error("Please Connect Wallet");
        const signedRouter = routerContract.connect(state.signer);
        var tx = await signedRouter.create(gameData);
        var res = await tx.wait();

        let sumEvent = res.events.pop();
        let stakingPoolAddress = sumEvent.args[0];
        return stakingPoolAddress;
    };

    return (
        <BlockchainContext.Provider
            value={useMemo(
                () => [
                    state,
                    {
                        deposit,
                        checkBalance,
                        stake,
                        unStake,
                        submitNewGame,
                        getStakingPoolInfo,
                    },
                ],
                [state]
            )}
        >
            {children}
        </BlockchainContext.Provider>
    );
}
