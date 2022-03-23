import React from "react";
import ReactDOM from "react-dom";
import { UseWalletProvider } from "use-wallet";
import { Provider } from "react-redux";
import "./assets/animated.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "aos/dist/aos.css";
import "aos/dist/aos.js";
import "antd/dist/antd.dark.min.css";
import "./assets/style.scss";
import "./index.css";
import App from "./app";
import store from "./store";

ReactDOM.render(
    <UseWalletProvider chainId={4002} connectors={{ portis: { dAppId: "SS" } }}>
        <Provider store={store}>
            <App />
        </Provider>
    </UseWalletProvider>,
    document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
