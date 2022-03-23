import React, { useState } from "react";
import { Link } from "react-router-dom";
import Action from "../../Service/action";
import { useSelector } from "react-redux";
import { Dialog, Slide } from "@mui/material";
// import { useWallet } from "use-wallet";
import Signpage from "../components/header/signpage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Header() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isTagVal, setIsTagVal] = useState(0);

    const auth = useSelector((state) => state.auth);

    const handlemodalclose = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <div className="header-user-sign">
                {auth.isAuthenticated ? (
                    <>
                        <span className="header-user-sign-in">
                            <Link to="/mypage" className="link-btn">
                                Balance&nbsp;&nbsp;
                                {Number(auth.user.balance).toFixed(0)}
                            </Link>
                        </span>
                        <span className="header-user-sign-in">
                            <Link to="/mypage" className="link-btn">
                                My Page
                            </Link>
                        </span>
                        <span
                            className="header-user-sign-in"
                            onClick={() => Action.logout()}
                        >
                            Log Out
                        </span>
                    </>
                ) : (
                    <>
                        <span
                            className="header-user-sign-in"
                            onClick={() => {
                                setIsShowModal(true);
                                setIsTagVal(0);
                            }}
                        >
                            Log In
                        </span>
                        <span
                            className="header-user-sign-up"
                            onClick={() => {
                                setIsShowModal(true);
                                setIsTagVal(1);
                            }}
                        >
                            Sign Up
                        </span>
                    </>
                )}
            </div>
            <Dialog
                className="SignInDialog"
                open={isShowModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handlemodalclose()}
            >
                <>
                    <Signpage
                        tabValue={isTagVal}
                        handlemodalclose={handlemodalclose}
                    />
                </>
            </Dialog>
        </>
    );
}
