import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonBase from "@mui/material/ButtonBase";
import Fade from "@mui/material/Fade";

import Partner from "../../components/partner";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
    },
    heading: {
        fontSize: "18px",
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: "16px",
        color: "white",
    },
    image: {
        width: 150,
        height: 150,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& img": {
            width: "700px",
            height: "500px",
        },
    },
}));

const HowItem = (props) => {
    const { index, imgURL, title, content, classes, expanded, handleChange } =
        props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Accordion
                expanded={expanded === "panel" + index}
                onChange={handleChange("panel" + index)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"panel" + index + "bh-content"}
                    id={"panel" + index + "bh-header"}
                >
                    <Typography className={classes.heading}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Grid container spacing={2}>
                            {imgURL !== undefined ? (
                                <Grid item>
                                    <ButtonBase
                                        className={classes.image}
                                        onClick={handleOpen}
                                    >
                                        <img
                                            className={classes.img}
                                            src={imgURL}
                                            alt=""
                                        />
                                    </ButtonBase>
                                </Grid>
                            ) : (
                                ""
                            )}
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column">
                                    <Grid item xs>
                                        <br />
                                        <Typography
                                            className={classes.secondaryHeading}
                                            variant="body2"
                                            gutterBottom
                                        >
                                            {content}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <img className={classes.img} src={imgURL} alt="" />
                </Fade>
            </Modal>
        </>
    );
};

export default function Howto() {
    const data = [
        {
            title: "Requirements",
            content:
                "- Metamask browser extension \n- ATRI ready to play \n- Enthusiasm and desire to win!",
        },
        {
            title: "1. How can you sign up to the platform?",
            content: `- First, you will need to click on the upper right corner where the Sign Up button is located. \n- Then, you will select a username to go by and an email. \n- Later on, the metamask tool will popup and ask for permission to sign the smart contract that allow you to interact with the casino \n- After everything is set, you can now log in!`,
            imgURL: "assets/documentation/1.png",
        },
        {
            title: "2. How do you log in into the platform?",
            content:
                "- First, you will need to locate in the upper right corner the Log In button available. \n- Then, it will show you the possibility to Sign In, which will give a metamask pop up. \n- As soon as the metamask popup appears, you will need to sign it to gain access to the casino. \n- And finally you will be able to deposit Atari Tokens into the platform to play, to stay or even upload new game ideas!",
            imgURL: "assets/documentation/2.png",
        },
        {
            title: "3. How to deposit Atari Token to platform",
            content:
                "- After being logged in, you have to go to My Page tab. \n- It will show your wallet’s information, the deposit section and the withdrawal section. \n- Now you can input the desired amount of ATRI in the“Deposit Amount” box. \n- Then, a metamask pop up will appear to approve the token and later on the transaction amount. \n- After confirming both metamask authorizations, your tokens should appear shortly after in your Atari Casino account.",
            imgURL: "assets/documentation/3.png",
        },
        {
            title: "4. How to withdraw from platform?",
            content:
                "- After being logged in, you have to go to My Page tab. \n- It will show your wallet’s information, the deposit section and the withdrawal section. \n- Now you can input the desired amount of ATRI in the “Withdraw Amount” box. \n- Then, a metamask transaction will need approval to move the tokens. - After it’s confirmed, you will have available shortly after your ATRI in your wallet!",
            imgURL: "assets/documentation/4.png",
        },
        {
            title: "5. How do I play different games?",
            content:
                "- After being logged in, you will beable to check the multiple gamesavailable in the platform.\n- As soon as you click one of thegames a atari casino pop up willappear asking the amount youwould like to play with, consideringthe minimum allowance amount. \n- After agreeing with the amount, ametamask pop up will ask you tosign the following. \n- Finally, the game will be availableto be played with the wager youwant to add on each round,considering the total amountselected before.",
            imgURL: "assets/documentation/5.png",
        },
        {
            title: "6. How do I stake ATRI into a game pool?",
            content:
                "- First, you will have to go to the “Farming” section. \n- Once you are there, you will need to select the game in which you want to stake your tokens for profits. \n- According to your ATRI balance in your metamask wallet (not balance inside the Atari Casino Amount), you will be able to stake the amount desired by inserting it in the “Stake” box. \n- Once it’s confirmed, a metamask pop up will require you to approve the token and later on the transaction. \n- Once both confirmations are completed, you will have sATRI balance, the token that will represent your staked portion inside the game pool.",
            imgURL: "assets/documentation/6.png",
        },
        {
            title: "7. How to withdraw from staking pool?",
            content:
                "- First, you will have to go to the “Farming” section. \n- Once you are there, you will need to select the game in which you have staked tokens. \n- Check your sATRI balance and write down in the “Withdraw” box the amount you want to unstake. \n- Confirm the transaction within metamask. \n- Once the transaction is confirmed you will see your ATRI balance updated in your wallet and the reduction of sATRI in the staking page.",
        },
        {
            title: "8. How to make profit with staking?",
            content:
                "The staking pool balance will work as the “House” in the casino, giving a proportional ownership to everyone that is staked into a game. \nThis allows the stakers to receive profits from the winning that the casino give in the game they decided to enter. \nExample: \nYou want to stake 1000 ATRI into the BlackJack staking pool. \nThe staking pool already has 9000 sATRI in it (sATRI is the staked version of ATRI). \nOnce you are done depositing your 1000 ATRI, they will become 1000 sATRI, giving a total balance of the BlackJack staking pool of 10,000 sATRI. \nThat means you have 10% of the staked tokens. \nIf no one deposits any more tokens and people begin playing BlackJack, the most likely situation is that the staking pool will increase due to the proportional losses people will have by playing the game. \nAfter a month of games the staking pool increased to 15,000 sATRI. \nThat means you still hold 10% from it, considering the previous supposition. \nNow your new balance by the end of the month will be 1,500 ATRI,giving you a 50% increase on your staked tokens compared to the initial staked amount.",
        },
        {
            title: "9. Are there any risk for stakers?",
            content:
                "Yes, as the staking pool amount can increase, it could also decrease, giving the possibility that all the tokens in the staking pool could be lost. Nonetheless, casinos have proven along the way that, at the end, the house always wins. \n\nIt’s important to consider that by staking you are becoming partially the owner of that casino game, giving you the benefits and the risks that this action includes.",
        },
    ];
    const data1 = [
        {
            title: "1. Are there any fees for stakers?",
            content:
                "Yes. All the profits that are produced by the games staking pool are completely distributed to the stakers. Reason why a staking fee is applied at the moment you stake your tokens. The total staking fee is 2%, which is divided in the following way: \n- A 1% for the platform maintenance.\n- A 1% for the game creator.",
        },
        {
            title: "2. Are there any fees for players?",
            content: "Yes, you are free to submit your games to the platform.",
        },
    ];
    const data2 = [
        {
            title: "1. Can I submit my games to platform?",
            content: "Yes, you are free to submit your games to the platform.",
        },
        {
            title: "2. Are there any audit and approval process in add listed game?",
            content:
                "As soon as the games are submitted into the platform they will endure a thorough security audit to avoid any possible exploits that could benefit someone when playing. When the approval is given the game will pass testing sessions to create guides to help new players and will be published shortly after.",
        },
        {
            title: "3. Is it free to submit games to the platform?",
            content:
                "Yes, the service is free. The only payment that will be required are the gas fees for the game deployment contract.",
        },
    ];

    const classes = useStyles();

    const [expanded, setExpanded] = useState("panel1");
    const [expanded1, setExpanded1] = useState(0);
    const [expanded2, setExpanded2] = useState(0);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange1 = (panel) => (event, isExpanded) => {
        setExpanded1(isExpanded ? panel : false);
    };
    const handleChange2 = (panel) => (event, isExpanded) => {
        setExpanded2(isExpanded ? panel : false);
    };

    return (
        <div className="howto">
            <div className="container">
                <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
                    data-aos-once={true}
                >
                    <h1 className="howtotitle">
                        How to interact with the Atari Casino Platform
                    </h1>
                    <div className={classes.root}>
                        {data.map((e, index) => {
                            return (
                                <HowItem
                                    key={index}
                                    index={index + 1}
                                    title={e.title}
                                    content={e.content}
                                    imgURL={e.imgURL}
                                    expanded={expanded}
                                    classes={classes}
                                    handleChange={handleChange}
                                />
                            );
                        })}
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div
                    data-aos="fade-right"
                    data-aos-anchor-placement="top-center"
                    data-aos-once={true}
                >
                    <h1 className="howtotitle">Fees for platform</h1>
                    <div className={classes.root}>
                        {data1.map((e, index) => {
                            return (
                                <HowItem
                                    key={index}
                                    index={index + 1}
                                    title={e.title}
                                    content={e.content}
                                    imgURL={e.imgURL}
                                    expanded={expanded1}
                                    classes={classes}
                                    handleChange={handleChange1}
                                />
                            );
                        })}
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div
                    data-aos="fade-left"
                    data-aos-anchor-placement="top-center"
                    data-aos-once={true}
                >
                    <h1 className="howtotitle">
                        Game submission to the platform
                    </h1>
                    <div className={classes.root}>
                        {data2.map((e, index) => {
                            return (
                                <HowItem
                                    key={index}
                                    index={index + 1}
                                    title={e.title}
                                    content={e.content}
                                    imgURL={e.imgURL}
                                    expanded={expanded2}
                                    classes={classes}
                                    handleChange={handleChange2}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <Partner />
        </div>
    );
}
