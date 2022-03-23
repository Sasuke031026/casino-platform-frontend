import React, { useState, useEffect, useCallback } from "react";
import { useWallet } from "use-wallet";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";

import Action from "../../../Service/action";

export default function IframeBlock() {
    const wallet = useWallet();
    const navigate = useNavigate();
    const fullscreen = useFullScreenHandle();
    const routerParams = useParams();

    const user = useSelector((states) => states.auth);
    const games = useSelector((states) => states.gamelist.gamelist);

    const [frontUrl, setFrontUrl] = useState("");
    const [height, setHeight] = useState(85);

    useEffect(() => {
        window.scrollTo(0, 0);
        games.map((list) => {
            if (list.poolAddress === routerParams.poolAddress) {
                setFrontUrl(list.frontendurl);
            }
        });
    }, []);

    useEffect(() => {
        if (!user.isAuthenticated || wallet.status !== "connected") {
            navigate("/");
            NotificationManager.error("Please Log In", "", 3000);
            Action.logout();
        }
    }, [user.isAuthenticated]);

    const reportChange = useCallback(
        (state, handle) => {
            if (state) setHeight(100);
            else setHeight(85);
        },
        [fullscreen]
    );

    const handleClose = async () => {
        navigate("/");
        setFrontUrl("");
    };

    return (
        <div className="MainIframe">
            <section className="jumpPanel">
                <CloseIcon className="classgame" onClick={handleClose} />
                &nbsp;&nbsp;
                <FullscreenIcon
                    className="fullscreen"
                    onClick={fullscreen.enter}
                />
                <FullScreen handle={fullscreen} onChange={reportChange}>
                    <div
                        className="gamePanel"
                        style={{ height: height + "vh" }}
                    >
                        {React.createElement("iframe", {
                            id: "gameIframe",
                            src: frontUrl,
                            title: "Casino game host",
                        })}
                    </div>
                </FullScreen>
            </section>
        </div>
    );
}
