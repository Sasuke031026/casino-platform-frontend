import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useSelector } from "react-redux";
import { Grid, Dialog } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useWallet } from "use-wallet";

import Action from "../../../Service/action";
import "./gamesubmit.css";

const GameInfoList = (props) => {
    const { title, info } = props;
    return (
        <div className="gamesub-content-block-item">
            <span className="gamesub-content-block-item-one">{title}</span>
            <span className="gamesub-content-block-item-sec">{info}</span>
        </div>
    );
};

const GameInfoListInput = (props) => {
    const { title, info, setInfo } = props;
    return (
        <div className="gamesub-content-block-item">
            <span className="gamesub-content-block-item-one">{title}</span>
            <input
                type="text"
                className="gamesub-content-block-input"
                value={info}
                onChange={setInfo}
            />
        </div>
    );
};

export default function EditGame() {
    const navigate = useNavigate();
    const wallet = useWallet();
    const routerParams = useParams();

    const [poolAddress, setPoolAddress] = useState("");
    const [gameImageUrl, setImageurl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frontendurl, setFrontendurl] = useState("");
    const [backendurl, setBackendurl] = useState("");
    const [gameKey, setGameKey] = useState("");
    const [isDocuModalShow, setDocuModalShow] = useState(false);
    const [state, setState] = useState({ copied: false });

    const auth = useSelector((states) => states.auth);
    const games = useSelector((states) => states.gamelist);

    const handlemodalclose = () => {
        setDocuModalShow(false);
    };

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
                    setDescription(list.description);
                    setFrontendurl(list.frontendurl);
                    setBackendurl(list.backendurl);
                    setImageurl(list.game_img_src);
                });
        }
    }, [auth]);

    const handleUpdate = async () => {
        var updateData = {
            poolAddress,
            gameImageUrl,
            description,
            frontendurl,
            backendurl,
        };
        Action.updateGame(updateData);
    };

    const handleGetKey = async () => {
        try {
            var updateData = {
                poolAddress,
            };
            let key = await Action.updateGameKey(updateData);
            if (key) {
                setGameKey(key);
            }

            setDocuModalShow(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            data-aos-once={true}
        >
            <div className="gameSubmit">
                <div className="gameSubmit-title">
                    <span className="page-move">
                        <Link to="/mypage">
                            <i className="fa fa-mail-reply" />
                        </Link>
                    </span>
                    View Game
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
                                        src={gameImageUrl}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                            className="game-info gamesub-content-block"
                        >
                            <GameInfoList title="Name" info={name} />
                            <GameInfoList
                                title="PoolAddress"
                                info={
                                    !poolAddress
                                        ? ""
                                        : poolAddress.slice(0, 5) +
                                          "..." +
                                          poolAddress.slice(-5)
                                }
                            />
                            <GameInfoListInput
                                title="Description"
                                info={description}
                                setInfo={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                            <GameInfoListInput
                                title="Frontend URL"
                                info={frontendurl}
                                setInfo={(e) => {
                                    setFrontendurl(e.target.value);
                                }}
                            />
                            <GameInfoListInput
                                title="Backend URL"
                                info={backendurl}
                                setInfo={(e) => {
                                    setBackendurl(e.target.value);
                                }}
                            />
                            <Grid
                                container
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item md={5} lg={5}>
                                    <button
                                        className="game-cover-btn upper"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </button>
                                </Grid>
                                <Grid item md={7} lg={7}>
                                    <button
                                        className="game-cover-btn upper"
                                        onClick={handleGetKey}
                                    >
                                        Game Key
                                    </button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <Dialog
                open={isDocuModalShow}
                keepMounted
                onClose={handlemodalclose}
            >
                <div className="apikey-modal-card">
                    <div className="docu-title">Access Key for Game</div>
                    <br />
                    <CopyToClipboard
                        text={gameKey}
                        onCopy={() => {
                            setState({ copied: true });
                            NotificationManager.success("copied");
                        }}
                    >
                        <div className="noselect">
                            Game Key: <span className="api_key">{gameKey}</span>
                        </div>
                    </CopyToClipboard>
                    <br />
                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;ATARI CASINO's API allows users
                        to do game inquiries tasks.
                    </div>
                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;Please keep your API key
                        confidential to protect your game.
                    </div>
                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;For security reasons, you need
                        to link your IP address with your API key.
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
