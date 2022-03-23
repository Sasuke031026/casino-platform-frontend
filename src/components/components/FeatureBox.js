import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const featurebox = () => (
    <div className="row noselect">
        <div className="col-lg-4 col-md-6 mb-3">
            <div className="feature-box f-boxed style-3">
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={0}
                    duration={600}
                    triggerOnce
                >
                    <img
                        src="assets/3500_game_ico.png"
                        alt=""
                        width={80}
                        height={60}
                    />
                </Reveal>
                <div className="text">
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={100}
                        duration={600}
                        triggerOnce
                    >
                        <br />
                        <h4 className="subTitle">Golden Games</h4>
                    </Reveal>
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={200}
                        duration={600}
                        triggerOnce
                    >
                        <p className="subContent">
                            Golden Game is EASY to play and easy to WIN BIG
                            Reward! Golden Game will become your favorite game!
                        </p>
                    </Reveal>
                </div>
                <i className="wm icon_currency"></i>
            </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
            <div className="feature-box f-boxed style-3">
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={0}
                    duration={600}
                    triggerOnce
                >
                    <img
                        src="assets/blockchain_game_ico.png"
                        alt=""
                        width={60}
                        height={60}
                    />
                </Reveal>
                <div className="text">
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={100}
                        duration={600}
                        triggerOnce
                    >
                        <br />
                        <h4 className="subTitle">Full Blockchain Games</h4>
                    </Reveal>
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={200}
                        duration={600}
                        triggerOnce
                    >
                        <p className="subContent">
                            Full Blockchain have tokenized in-game assets
                            allowing players to collect them as non-fungible
                            tokens (NFTs).
                        </p>
                    </Reveal>
                </div>
                <i className="wm icon_link"></i>
            </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
            <div className="feature-box f-boxed style-3">
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={0}
                    duration={600}
                    triggerOnce
                >
                    <img
                        src="assets/own_game_ico.png"
                        alt=""
                        width={60}
                        height={60}
                    />
                </Reveal>
                <div className="text">
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={100}
                        duration={600}
                        triggerOnce
                    >
                        <br />
                        <h4 className="subTitle">Submit your own Game</h4>
                    </Reveal>
                    <Reveal
                        className="onStep"
                        keyframes={fadeInUp}
                        delay={200}
                        duration={600}
                        triggerOnce
                    >
                        <p className="subContent">
                            You can upload your own game. Play it with your
                            friends.
                        </p>
                    </Reveal>
                </div>
                <i className="wm icon_cloud-upload_alt"></i>
            </div>
        </div>
    </div>
);
export default featurebox;
