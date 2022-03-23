import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";

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
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slidermain = () => (
    <div className="container">
        <img
            src="./assets/bfg_back_img.png"
            alt=""
            className="back_img noselect"
        />
        <div className="row align-items-center">
            <div className="col-md-5">
                <div className="spacer-single"></div>
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={0}
                    duration={600}
                    triggerOnce
                >
                    <h6 className="">
                        <span className="text-uppercase h1 white">
                            Atari Token Casino
                        </span>
                    </h6>
                </Reveal>
                <div className="spacer-10"></div>
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={300}
                    duration={600}
                    triggerOnce
                >
                    <h1 className="color">Golden Chance</h1>
                </Reveal>
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={600}
                    duration={600}
                    triggerOnce
                >
                    <p className="lead grey">
                        The blockchain that will revolutionize the gambling{" "}
                        industry
                    </p>
                </Reveal>
                <div className="spacer-10"></div>
                <Reveal
                    className="onStep"
                    keyframes={fadeInUp}
                    delay={1200}
                    duration={1300}
                    triggerOnce
                >
                    <span className="btn-main lead">
                        <Link to="">Explore</Link>
                    </span>
                    <div className="mb-sm-30"></div>
                </Reveal>
            </div>
            <div className="col-md-7 xs-hide">
                <Reveal
                    className="onStep"
                    keyframes={fadeIn}
                    delay={900}
                    duration={1500}
                    triggerOnce
                >
                    <img
                        src="./assets/slot_machine.png"
                        className="lazy img-fluid backImg noselect"
                        alt=""
                    />
                </Reveal>
            </div>
        </div>
    </div>
);
export default slidermain;
