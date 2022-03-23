import React from "react";
import { Link } from "react-router-dom";
import "./pagenotfound.css";
import "./pagenotfound_responsive.css";

function PageNotFound() {
    return (
        <div className="pagenotfound">
            <div className="page-img">
                <img src="./assets/404page.gif" alt="" />
            </div>
            <div className="page-content">
                <h2>Oops! Page not found.</h2>
                <h1>404</h1>
                <p>We can't find the page you're looking for</p>
                <Link to="/" className="link-btn upper">
                    Go Back HOME
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;
