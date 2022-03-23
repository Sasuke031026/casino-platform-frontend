import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { useWallet } from "use-wallet";
import { NotificationManager } from "react-notifications";

import { useBlockchainContext } from "../../../blockchainContexts";
import Action from "../../../Service/action";
import Partner from "../../components/partner";

import "./mypage.css";

export default function MyPage() {
    const wallet = useWallet();
    const [state, { deposit, checkBalance }] = useBlockchainContext();
    const [gameItems, setGameItems] = useState([]);
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [loadingImg, setLoadingImg] = useState(false);
    const [withdrawLoadingImg, setWithdrawLoadingImg] = useState(false);
    const [depositErr, setDepositErr] = useState(false);
    const [withdrawErr, setWithdrawErr] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((states) => states.auth);
    const games = useSelector((states) => states.gamelist);

    useEffect(() => {
        if (!user.isAuthenticated || wallet.status !== "connected") {
            navigate("/");
            NotificationManager.error("Please Log In", "", 3000);
            Action.logout();
        }
    }, [user.isAuthenticated]);

    useEffect(() => {
        Action.updateUserData();
        setGameItems(games.gamelist);
    }, []);

    useEffect(() => {
        checkBalance();
    }, [wallet.status]);

    useEffect(() => {
        if (!state.balance || depositAmount > state.balance)
            setDepositErr(true);
        else setDepositErr(false);
    }, [depositAmount, state.balance]);

    useEffect(() => {
        if (!user.user.balance || withdrawAmount > user.user.balance)
            setWithdrawErr(true);
        else setWithdrawErr(false);
    }, [withdrawAmount, user.user.balance]);

    const setDeposit = (e) => {
        if (e.target.value < 0) {
            setDepositAmount(0);
        } else {
            setDepositAmount(e.target.value);
        }
    };

    const setWithdraw = (e) => {
        if (e.target.value < 0) {
            setWithdrawAmount(0);
        } else {
            setWithdrawAmount(e.target.value);
        }
    };

    const handleConfirm = async () => {
        if (depositAmount <= 0) {
            NotificationManager.error("Please Input Amount.", "", 2000);
        } else {
            if (wallet.status === "connected") {
                try {
                    setLoadingImg(true);
                    const depositResult = await deposit(depositAmount);
                    if (!depositResult.success) {
                        await setLoadingImg(false);
                        return;
                    }
                    await setLoadingImg(false);
                    await setDepositAmount(0);

                    dispatch({
                        type: "SET_CURRENT_USER",
                        payload: {
                            ...user.user,
                            balance:
                                Number(user.user.balance) +
                                Number(depositAmount),
                        },
                    });
                } catch (err) {
                    NotificationManager.error("Deposit Failed!", "", 3000);
                    setLoadingImg(false);
                }
            } else {
                wallet.connect();
            }
        }
    };

    const handleWithdraw = async () => {
        if (withdrawAmount <= 0) {
            NotificationManager.error("Please Input Amount.", "", 2000);
        } else {
            if (wallet.status !== "connected") {
                NotificationManager.error("Please connect wallet!", "", 3000);
                return;
            }
            try {
                setWithdrawLoadingImg(true);
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();
                const signature = await signer.signMessage(
                    "withdraw " + withdrawAmount
                );

                const withDrawData = {
                    withdrawAmount: withdrawAmount,
                    signature: signature,
                };
                await Action.withdrawRequest(withDrawData);
                setWithdrawLoadingImg(false);
            } catch (err) {
                NotificationManager.error("Withdraw Failed!", "", 3000);
                setWithdrawLoadingImg(false);
            }
        }
    };

    return (
        <div className="mypage">
            <div className="container">
                <div
                    data-aos="zoom-out"
                    data-aos-anchor-placement="top-center"
                    data-aos-once={true}
                >
                    <div className="mygame-title t-font text-center">
                        My Account
                    </div>
                    <Grid container className="card-group">
                        <Grid
                            item
                            lg={3.7}
                            md={5}
                            xs={11}
                            className="card-block text-center"
                        >
                            <div className="card-title t-font">
                                MY INFORMATION
                            </div>
                            <div className="card-main">
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Name:
                                    </Grid>
                                    <Grid
                                        item
                                        md={7}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        {user.user.name}
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Email:
                                    </Grid>
                                    <Grid
                                        item
                                        md={7}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        {user.user.email}
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Account:
                                    </Grid>
                                    <Grid
                                        item
                                        md={7}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        {user.isAuthenticated && user.user
                                            ? user.user.account.substring(
                                                  0,
                                                  6
                                              ) +
                                              "..." +
                                              user.user.account.substring(
                                                  user.user.account.length - 4
                                              )
                                            : ""}
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Balance:
                                    </Grid>
                                    <Grid
                                        item
                                        md={7}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        <span>
                                            <span
                                                style={{
                                                    color: "var(--block_clr)",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {Number(
                                                    user.user.balance
                                                ).toFixed(0)}
                                            </span>{" "}
                                            ATRI
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid
                            item
                            lg={3.7}
                            md={5}
                            xs={11}
                            className="card-block text-center"
                        >
                            <div className="card-title t-font">DEPOSIT</div>
                            <div className="card-main">
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5.5}
                                        xs={5.9}
                                        className="card-main-label"
                                    >
                                        Deposit Amount:
                                    </Grid>
                                    <Grid
                                        item
                                        md={6.5}
                                        xs={5.9}
                                        className="card-main-content"
                                    >
                                        <div className="card-main-content card-input-block">
                                            <span>ATRI</span>
                                            <input
                                                type="number"
                                                className="card-amount-input"
                                                min={0}
                                                value={depositAmount}
                                                onChange={(e) => {
                                                    setDeposit(e);
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Total:
                                    </Grid>
                                    <Grid
                                        item
                                        md={7}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        {Number(depositAmount).toFixed(0)} ATRI
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <div
                                    className="card-btn text-center t-font"
                                    onClick={handleConfirm}
                                    disabled={depositErr}
                                >
                                    {wallet.status !== "connected" ? (
                                        "Wallet Connect"
                                    ) : loadingImg ? (
                                        <img
                                            src="assets/box.gif"
                                            alt="loadimage"
                                        />
                                    ) : depositErr ? (
                                        "Insufficient Balance"
                                    ) : (
                                        "Confirm  " +
                                        Number(depositAmount).toFixed(0) +
                                        " ATRI"
                                    )}
                                </div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            lg={3.7}
                            md={5}
                            xs={11}
                            className="card-block text-center"
                        >
                            <div className="card-title t-font">Withdraw</div>
                            <div className="card-main">
                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5.5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Withdraw Amount:
                                    </Grid>
                                    <Grid
                                        item
                                        md={6.5}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        <div className="card-main-content card-input-block">
                                            <span>ATRI</span>
                                            <input
                                                type="number"
                                                className="card-amount-input"
                                                min={0}
                                                value={withdrawAmount}
                                                onChange={(e) => {
                                                    setWithdraw(e);
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                    className="card-main-item"
                                >
                                    <Grid
                                        item
                                        md={5}
                                        xs={6}
                                        className="card-main-label"
                                    >
                                        Balance:
                                    </Grid>
                                    <Grid
                                        item
                                        md={7}
                                        xs={6}
                                        className="card-main-content"
                                    >
                                        {Number(user.user.balance).toFixed(0)}
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <div
                                    className="card-btn text-center"
                                    onClick={handleWithdraw}
                                    disabled={withdrawErr}
                                >
                                    {wallet.status !== "connected" ? (
                                        "Wallet Connect"
                                    ) : withdrawLoadingImg ? (
                                        <img
                                            src="assets/box.gif"
                                            alt="loadimage"
                                        />
                                    ) : withdrawErr ? (
                                        "Insufficient Balance"
                                    ) : (
                                        "Withdraw  " +
                                        Number(withdrawAmount).toFixed(0) +
                                        " ATRI"
                                    )}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <div className="gameadd">
                        <br />
                        <br />
                        <div className="submit-btn text-center">
                            <Link className="link-btn" to="/upload-game">
                                <button>Submit</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="spacer-10" />
                <div className="spacer-double" />

                <div
                    data-aos="fade-left"
                    data-aos-anchor-placement="top-center"
                    data-aos-once={true}
                >
                    <div className="t-font text-center">My Games</div>
                    <div className="spacer-double"></div>
                    <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className="mygame-list text-center"
                    >
                        {gameItems.filter((glist) => {
                            return glist.owner === user.user.account;
                        }).length > 0 ? (
                            gameItems
                                .filter((glist) => {
                                    return glist.owner === user.user.account;
                                })
                                .map((list, index) => (
                                    <Grid
                                        item
                                        key={index}
                                        className="mygame-list-item"
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                    >
                                        <Link
                                            to={`/upload-game/${list.poolAddress}`}
                                        >
                                            <div className="mygame-list-image-item">
                                                <img
                                                    src={list.game_img_src}
                                                    alt={list.game_img_src}
                                                />
                                            </div>
                                            <div className="mygame-list-item-back"></div>
                                            <div className="mygame-list-item-hover">
                                                <div className="mygame-list-item-title">
                                                    {list.name}
                                                </div>
                                                <div className="mygame-list-item-btns">
                                                    <div className="mygame-list-item-btn">
                                                        <i className="fa fa-eye" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Grid>
                                ))
                        ) : (
                            <div
                                style={{ width: "100%" }}
                                className="white text-center"
                            >
                                No Games
                            </div>
                        )}
                    </Grid>
                </div>
            </div>
            <Partner />
        </div>
    );
}
