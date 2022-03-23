/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useWallet } from "use-wallet";
import NotificationManager from "react-notifications/lib/NotificationManager";

import { useBlockchainContext } from "../../../blockchainContexts";
import Action from "../../../Service/action";

const AntTabs = withStyles({
    root: {
        borderBottom: "2px solid rgb(60, 63, 66)",
    },
    indicator: {
        height: "2px",
        backgroundColor: "var(--block_clr)",
    },
    flexContainer: {
        justifyContent: "center",
    },
})(Tabs);

const AntTab = withStyles({
    root: {
        textTransform: "none",
        minWidth: "50px",
        color: "white",
        fontSize: "15px !important",
        "&:focus": {
            color: "var(--block_clr)!important",
        },
        "&:hover": {
            color: "var(--block_clr)!important",
        },
    },
    selected: {
        color: "var(--block_clr)!important",
    },
})((props) => <Tab disableRipple {...props} />);

const GameInfoList = (props) => {
    const { title, info } = props;
    return (
        <div className="gamesub-content-block-item">
            <span className="gamesub-content-block-item-one">{title}</span>
            <span className="gamesub-content-block-item-sec">{info}</span>
        </div>
    );
};

export default function EditFarm() {
    const navigate = useNavigate();
    const wallet = useWallet();
    const routerParams = useParams();
    const [state, { stake, unStake, getStakingPoolInfo }] =
        useBlockchainContext();
    const [poolAddress, setPoolAddress] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [name, setName] = useState("");
    const [stakeFlag, setStakFlag] = useState([0, false]);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);

    const auth = useSelector((states) => states.auth);
    const games = useSelector((states) => states.gamelist);

    useEffect(() => {
        if (!auth.isAuthenticated || wallet.status !== "connected") {
            navigate("/");
            NotificationManager.error("Please Log In", "", 3000);
            Action.logout();
        } else {
            games.gamelist
                .filter((glist) => {
                    return glist.poolAddress === routerParams.poolAddress;
                }) // eslint-disable-next-line
                .map((list) => {
                    setPoolAddress(list.poolAddress);
                    setName(list.name);
                    setImageurl(list.game_img_src);
                });
        }
    }, [auth]);

    useEffect(() => {
        if (poolAddress) getStakingPoolInfo(poolAddress);
    }, [poolAddress]);

    const handleStake = async () => {
        try {
            if (amount <= 0) {
                NotificationManager.error("Please Input Amount.", "", 2000);
                return;
            }
            setLoading(true);
            await stake(amount, poolAddress);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const handleUnStake = async () => {
        try {
            if (amount <= 0) {
                NotificationManager.error("Please Input Amount.", "", 2000);
                return;
            }
            setLoading(true);
            await unStake(amount, poolAddress);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const changeFlag = (event, newValue) => {
        if (newValue === 0) {
            setStakFlag([newValue, false]);
        } else {
            setStakFlag([newValue, true]);
        }
    };

    return (
        <div
            data-aos="fade-down"
            data-aos-anchor-placement="top-center"
            data-aos-once={true}
        >
            <div className="gameFarm">
                <div className="gameSubmit-title">
                    <span className="page-move">
                        <Link to="/farm">
                            <i className="fa fa-mail-reply" />
                        </Link>
                    </span>
                    Staking Game
                </div>
                <div className="gamesubmit-card-block">
                    <Grid container className="gameSubmit-main">
                        <Grid
                            item
                            md={5}
                            xs={12}
                            className="gamesub-upload-block"
                        >
                            <div style={{ width: "100%" }}>
                                <div className="gamesub-upload-preview">
                                    <img
                                        className="submitIMG"
                                        alt="Avatar"
                                        src={imageurl}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <div className="gamesub-content-block">
                            <div className="game-info">
                                <GameInfoList
                                    title="Game Address"
                                    info={
                                        poolAddress
                                            ? poolAddress.slice(0, 5) +
                                              "..." +
                                              poolAddress.slice(-5)
                                            : ""
                                    }
                                />
                                <GameInfoList title="Name" info={name} />
                                <GameInfoList
                                    title="Your Staking Amount"
                                    info={
                                        !state[poolAddress]
                                            ? "0 ATRI"
                                            : state[poolAddress].stakingAmount +
                                              " " +
                                              state[poolAddress].symbol
                                    }
                                />
                                <GameInfoList
                                    title="Total Stake"
                                    info={
                                        !state[poolAddress]
                                            ? "0 ATRI"
                                            : state[poolAddress].total +
                                              " " +
                                              state[poolAddress].symbol
                                    }
                                />
                                <GameInfoList
                                    title="PoolBalance"
                                    info={
                                        !state[poolAddress]
                                            ? "0 ATRI"
                                            : Number(
                                                  state[poolAddress].poolBalance
                                              ).toFixed(0) + " ATRI"
                                    }
                                />
                                <GameInfoList
                                    title="My Balance"
                                    info={
                                        Number(state.balance).toFixed(0) +
                                        " ATRI"
                                    }
                                />
                            </div>
                            <div className="gamesub-content-block-item">
                                <AntTabs
                                    value={stakeFlag[0]}
                                    onChange={changeFlag}
                                    aria-label="signpageTab"
                                >
                                    <AntTab label="Staking" />
                                    <AntTab label="Withdraw" />
                                </AntTabs>
                                <br />
                                <input
                                    className="gamesub-content-block-input"
                                    style={{
                                        width: "97%",
                                        textAlign: "right",
                                    }}
                                    type="number"
                                    placeholder="Enter the amount"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                                {!stakeFlag[1] ? (
                                    <div className="myinfo-content-item">
                                        {loading ? (
                                            <div className="myinfo-content-btn text-center">
                                                <img
                                                    src="../assets/box.gif"
                                                    alt=""
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="myinfo-content-btn text-center"
                                                onClick={handleStake}
                                            >
                                                Staking
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="myinfo-content-item">
                                        {loading ? (
                                            <div className="myinfo-content-btn text-center">
                                                <img
                                                    src="../assets/box.gif"
                                                    alt=""
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className="myinfo-content-btn text-center"
                                                onClick={handleUnStake}
                                            >
                                                Withdraw
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                </div>
            </div>
        </div>
    );
}
