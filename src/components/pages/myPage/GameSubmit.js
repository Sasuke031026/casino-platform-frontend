import React, { createRef, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { NotificationManager } from "react-notifications";
import { useWallet } from "use-wallet";
import reactImageSize from "react-image-size";

import { useBlockchainContext } from "../../../blockchainContexts";
import Action from "../../../Service/action";
import "./gamesubmit.css";

export default function GameSubmit(props) {
    const wallet = useWallet();
    const [state, { submitNewGame }] = useBlockchainContext();

    const [image, _setImage] = useState(null);
    const [selectedFile, setSeletedFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [frontendurl, setFrontendurl] = useState("");
    const [backendurl, setBackendurl] = useState("");
    const [imgSelectStatus, setImgSelectStatus] = useState(true);
    const [loadingbtn, setLoadingbtn] = useState(false);
    const [loadingState, setLoadingState] = useState("");

    const nameInput = useRef(null);
    const descriptionInput = useRef(null);
    const frontendurlInput = useRef(null);
    const backendurlInput = useRef(null);
    const inputFileRef = createRef(null);

    const user = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAuthenticated || wallet.status !== "connected") {
            navigate("/");
            NotificationManager.error("Please Log In", "", 3000);
            Action.logout();
        }
    }, [user.isAuthenticated]);

    const cleanup = () => {
        URL.revokeObjectURL(image);
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const onSubmit = async () => {
        if (name.trim() === "") {
            nameInput.current.focus();
        } else if (description.trim() === "") {
            descriptionInput.current.focus();
        } else if (frontendurl.trim() === "") {
            frontendurlInput.current.focus();
        } else if (backendurl.trim() === "") {
            backendurlInput.current.focus();
        } else if (selectedFile === null) {
            setImgSelectStatus(false);
        } else {
            try {
                setLoadingbtn(true);

                setLoadingState("contract deploy...");

                var gameData = {
                    gameOwner: user.user.account,
                    feeRate: "20000",
                    gameName: name.trim(),
                };

                var poolAddress = await submitNewGame(gameData);
                const formData = new FormData();
                formData.append("uploadfile", selectedFile);
                formData.append("name", name.trim());
                formData.append("description", description.trim());
                formData.append("frontendurl", frontendurl.trim());
                formData.append("backendurl", backendurl.trim());
                formData.append("poolAddress", poolAddress);

                setLoadingState("submit game...");
                await Action.uploadDataSave(formData);

                setLoadingState("Success...");
                NotificationManager.success("Upload success!", "", 3000);

                setName("");
                setDescription("");
                setFrontendurl("");
                setBackendurl("");
                _setImage("");
                setSeletedFile("");
                cleanup();
                setLoadingbtn(false);
            } catch (err) {
                NotificationManager.error("Submit Error", "", 3000);
                setLoadingbtn(false);
            }
        }
    };

    const handleOnChange = async (event) => {
        const newImage = event.target?.files?.[0];
        const rejectTimeout = 5000;

        if (newImage) {
            try {
                const { width, height } = await reactImageSize(
                    URL.createObjectURL(newImage),
                    rejectTimeout
                );

                if (height !== 338 || width !== 600) {
                    NotificationManager.error("Image Size Invalid", "", 3000);
                    return;
                }
                setImage(URL.createObjectURL(newImage));
                setSeletedFile(newImage);
                setImgSelectStatus(true);
            } catch (err) {
                NotificationManager.error("Image Loading Error", "", 3000);
            }
        }
    };

    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
            setSeletedFile(null);
        }
    };

    return (
        <div
            data-aos="fade-down"
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
                    GameSubmit
                </div>
                <Grid container direction="row" className="gameSubmit-main">
                    <Grid item md={5} xs={12} className="gamesub-upload-block">
                        <div style={{ width: "100%" }}>
                            <div
                                className={
                                    "gamesub-upload-preview " +
                                    (image
                                        ? ""
                                        : "borderblockclr " +
                                          (imgSelectStatus
                                              ? ""
                                              : "bordererrclr "))
                                }
                            >
                                {image ? (
                                    <img
                                        className="submitIMG"
                                        alt="Avatar"
                                        src={image || "assets/atari_mark.png"}
                                    />
                                ) : (
                                    <>
                                        <i className="fa fa-cloud-upload" />
                                        No file chosen, yet!
                                    </>
                                )}
                            </div>
                            <input
                                ref={inputFileRef}
                                accept="image/*"
                                hidden
                                id="game-coverimage-upload"
                                type="file"
                                onChange={handleOnChange}
                            />
                            <label
                                htmlFor="game-coverimage-upload"
                                className="game-cover-btn-block"
                            >
                                <div
                                    className="game-cover-btn upper"
                                    onClick={handleClick}
                                >
                                    {image ? (
                                        <i className="fa fa-trash-o" />
                                    ) : (
                                        <i className="fa fa-cloud-upload" />
                                    )}
                                    {image ? "Clear" : "Upload"}
                                </div>
                            </label>
                            <br />
                            <br />
                            <span style={{ color: "var(--block_clr)" }}>※</span>
                            &nbsp;
                            <label className="text-center white">
                                Please fix image size to{" "}
                                <span style={{ color: "var(--block_clr)" }}>
                                    600px
                                </span>{" "}
                                ×{" "}
                                <span style={{ color: "var(--block_clr)" }}>
                                    338px
                                </span>
                            </label>
                        </div>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                        className="game-info gamesub-content-block"
                    >
                        <div className="gamesub-content-block-item">
                            <span>
                                Name{" "}
                                <span style={{ color: "var(--block_clr)" }}>
                                    *
                                </span>
                            </span>
                            <input
                                required
                                ref={nameInput}
                                className="gamesub-content-block-input"
                                type="text"
                                placeholder="Game name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="gamesub-content-block-item">
                            <span>
                                Description{" "}
                                <span style={{ color: "var(--block_clr)" }}>
                                    *
                                </span>
                            </span>
                            <textarea
                                required
                                ref={descriptionInput}
                                className="gamesub-content-block-input"
                                placeholder="Description"
                                rows={5}
                                style={{ minHeight: "150px" }}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </div>
                        <div className="gamesub-content-block-item">
                            <span>
                                Frontend URL
                                <span style={{ color: "var(--block_clr)" }}>
                                    *
                                </span>
                            </span>
                            <input
                                required
                                ref={frontendurlInput}
                                className="gamesub-content-block-input"
                                type="url"
                                placeholder="Frontend URL"
                                value={frontendurl}
                                onChange={(e) => setFrontendurl(e.target.value)}
                            />
                        </div>
                        <div className="gamesub-content-block-item">
                            <span>
                                Backend URL
                                <span style={{ color: "var(--block_clr)" }}>
                                    *
                                </span>
                            </span>
                            <input
                                required
                                ref={backendurlInput}
                                className="gamesub-content-block-input"
                                type="url"
                                placeholder="Backend URL"
                                value={backendurl}
                                onChange={(e) => setBackendurl(e.target.value)}
                            />
                        </div>
                        <div className="gamesub-content-block-item">
                            {loadingbtn ? (
                                <button
                                    type="submit"
                                    className="gamesub-content-submit-btn upper"
                                >
                                    <span>{loadingState}</span>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="gamesub-content-submit-btn upper"
                                    onClick={() => onSubmit()}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
