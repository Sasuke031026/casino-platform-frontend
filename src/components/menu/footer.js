import React from "react";
import { Link } from "@reach/router";

const footer = () => (
    <footer className="footer-light">
        <div className="container">
            <div className="row">
                <div className="col-md-2 col-sm-6 col-xs-1">
                    <div className="widget">
                        <img
                            src="./assets/atari_mark.png"
                            alt=""
                            width="100%"
                        />
                    </div>
                </div>
                <div className="col-md-5 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h4>Quick Links</h4>
                        <ul className="s2">
                            <li>
                                <Link to="">Home</Link>
                            </li>
                            <li>
                                <Link to="">Vision</Link>
                            </li>
                            <li>
                                <Link to="">About</Link>
                            </li>
                            <li>
                                <Link to="">FAQ</Link>
                            </li>
                            <li>
                                <Link to="">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-5 col-sm-6 col-xs-1">
                    <div className="widget">
                        <h5>Newsletter</h5>
                        <p>
                            Signup for our newsletter to get the latest news in
                            your inbox.
                        </p>
                        <br />
                        <div className="newLetterGroup">
                            <input type="text" className="newletterinput" />
                            <button className="newlettersubmit">Submit</button>
                        </div>
                        <br />
                        <div className="spacer-10"></div>
                        <br />
                        <br />
                        <h5>Follow Us</h5>
                        <div className="footerList">
                            <i className="social_facebook"></i>
                            <i className="social_twitter"></i>
                            <i className="social_pinterest"></i>
                            <i className="social_linkedin"></i>
                            <i className="social_instagram"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="subfooter">
            <div className="container">
                <div className="text-center">
                    <span>Privacy Policy</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Terms of Use</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span>Risk Factors</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span>Regulatory</span>
                    <span>Oversight</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Atari Token</span>
                    <span>Disclaimer</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>AML/CFT</span>
                    <span>Policy</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Atari Token Improvement Policy</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Cookie Policy</span>
                </div>
            </div>
        </div>
    </footer>
);
export default footer;
