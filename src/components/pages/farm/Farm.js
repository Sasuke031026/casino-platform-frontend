import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Partner from "../../components/partner";
import "./farm.css";

export default function Farm() {
    const [gameItems, setGameItems] = useState([]);
    const [viewstyle, setViewStyle] = useState({ display: "none" });
    const [totalPoolBalance, setTotalPoolBalance] = useState(0);

    const games = useSelector((states) => states.gamelist);

    useEffect(() => {
        var gamelist = games.gamelist;
        setGameItems(gamelist);
        var bump = 0;
        for (var i = 0; i < gamelist.length; i++) {
            bump += gamelist[i].poolBalance;
        }
        setTotalPoolBalance(bump);
    }, [games.gamelist]);

    const allview = () => {
        setViewStyle({ display: "inline-block", height: "200px" });
    };

    return (
        <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-once={true}
        >
            <div className="farm">
                <div className="container">
                    <Grid container direction="row" className="farm-main">
                        <Grid item xs={12} lg={4} className="farm-left-section">
                            <div className="text-uppercase h1 white">
                                Atari Staking
                            </div>
                            <h1 className="color">Pick the Game</h1>
                            <p className="lead grey">
                                You can stake for each game and can receive more
                                rewards
                            </p>
                            <div className="games-sec1-img">
                                <img
                                    src="assets/jackpot_img.png"
                                    alt="jackpotimage"
                                    className="games-sec1-jack-img"
                                />
                                <img
                                    src="assets/jackpot_back_img.png"
                                    alt="jackpotbackimage"
                                    className="games-sec1-img-back noselect"
                                />
                            </div>
                            <div className="games-sec1-content">
                                <div className="games-sec1-content-title2">
                                    Total Stake
                                </div>
                                <div className="spacer-single"></div>
                                <div className="games-sec1-content-title1 upper">
                                    {Number(totalPoolBalance).toFixed(0)} ATRI
                                </div>
                            </div>
                            <div className="games-sec1-show-block">
                                <div
                                    className="games-sec1-show-btn"
                                    onClick={allview}
                                >
                                    All games
                                    <i className="fa fa-arrow-right" />
                                </div>
                            </div>
                            <div className="spacer-single"></div>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={8}
                            container
                            direction="row"
                            className="submit-games"
                            style={{ padding: "0" }}
                        >
                            <Grid container spacing={2}>
                                {gameItems.filter((glist) => {
                                    return glist.approve_flag === true;
                                }).length > 0 ? (
                                    gameItems
                                        .filter((glist) => {
                                            return glist.approve_flag === true;
                                        })
                                        .map((list, index) => {
                                            return index < 12 ? (
                                                <Grid
                                                    item
                                                    key={index}
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    lg={3}
                                                    style={{ height: "200px" }}
                                                >
                                                    <Link
                                                        to={`/farming/${list.poolAddress}`}
                                                    >
                                                        <div className="mygame-list-image-item">
                                                            <img
                                                                src={
                                                                    list.game_img_src
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                    </Link>
                                                </Grid>
                                            ) : (
                                                <Grid
                                                    item
                                                    key={index}
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    lg={3}
                                                    style={viewstyle}
                                                >
                                                    <Link
                                                        to={`/farming/${list.poolAddress}`}
                                                    >
                                                        <div className="mygame-list-image-item">
                                                            <img
                                                                src={
                                                                    list.game_img_src
                                                                }
                                                                alt=""
                                                            />
                                                        </div>
                                                    </Link>
                                                </Grid>
                                            );
                                        })
                                ) : (
                                    <div
                                        style={{ width: "100%" }}
                                        className="white text-center"
                                    >
                                        No Games
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <Partner />
            </div>
        </div>
    );
}
