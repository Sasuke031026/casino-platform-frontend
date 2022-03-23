import React, { useEffect } from "react";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import Action from "../../../Service/action";

import "./header.css";

export default function LoginTab(props) {
    const { handlemodalclose } = props;
    const wallet = useWallet();
    const user = useSelector((state) => state.auth);
    const msg = "Welcome to a ATARI casino";

    useEffect(() => {
        if (user.isAuthenticated) {
            handlemodalclose();
        }
    }, [user.isAuthenticated]);

    useEffect(() => {
        if (wallet.status === "error") {
            NotificationManager.error(
                "please connect to correct chain",
                "",
                3000
            );
        }
    }, [wallet.status]);

    const getSignature = async () => {
        if (wallet.status === "connected") {
            try {
                const provider = new ethers.providers.Web3Provider(
                    wallet.ethereum
                );
                const signer = await provider.getSigner();
                const signature = await signer.signMessage(msg);

                const loginData = {
                    msg: msg,
                    signature: signature,
                };

                Action.login(loginData);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <Box sx={{ py: 2 }}>
            {wallet.status === "connected" ? (
                <Button
                    className="login-enable-btn"
                    color="primary"
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    onClick={() => getSignature()}
                >
                    sign in
                </Button>
            ) : (
                <Button
                    className="login-enable-btn"
                    color="primary"
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    onClick={() => wallet.connect()}
                >
                    connect
                </Button>
            )}
        </Box>
    );
}
