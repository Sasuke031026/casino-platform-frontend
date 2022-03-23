import setAuthToken from "./http-common";
import jwt_decode from "jwt-decode";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import config from "../config/config";
import store from "../store";

axios.defaults.baseURL = config.BackendURI;

// User Auth
const register = async (signData) => {
    try {
        var res = await axios.post("/api/users/register", signData);

        if (!res.data.status) {
            NotificationManager.error(res.data.errors, "", 3000);
            return;
        }

        const decoded = jwt_decode(res.data.token);
        if (!localStorage.getItem("jwtToken", res.data.token))
            localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", res.data.token);

        store.dispatch({
            type: "SET_CURRENT_USER",
            payload: decoded,
        });

        NotificationManager.success("WELCOME TO CASINO", "", 3000);
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
    }
};

const login = async (logData) => {
    try {
        const res = await axios.post("/api/users/login", logData);

        if (!res.data.status) {
            NotificationManager.error(res.data.errors, "", 3000);
            return;
        }

        const decoded = jwt_decode(res.data.token);

        if (!localStorage.getItem("jwtToken", res.data.token))
            localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", res.data.token);

        setAuthToken(res.data.token);

        store.dispatch({
            type: "SET_CURRENT_USER",
            payload: decoded,
        });

        NotificationManager.success("WELCOME TO CASINO", "", 3000);
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
    }
};

const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests

    // Set current user to {} which will set isAuthenticated to false
    setCurrentUser({});
};

// Game Manage
const getUserGamelist = async () => {
    try {
        var res = await axios.post("/api/games/getgamelist");

        if (res.data.status === false) {
            NotificationManager.success(res.data.message, "", 3000);
            return;
        }

        store.dispatch({
            type: "SET_CURRENT_GAMELIST",
            payload: res.data.games,
        });
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
    }
};

const approveToGame = async (approveAmount, poolAddress) => {
    try {
        // signature
        var data = store.getState();
        var signer = data.auth.signer;
        const signature = await signer.signMessage(
            "approve " + approveAmount + poolAddress
        );

        // request
        var signData = {
            approveAmount: approveAmount,
            poolAddress: poolAddress,
            signature: signature,
        };

        var res = await axios.post("/api/users/approve", signData);

        if (!res.data.status) {
            NotificationManager.error("Server Error", "", 3000);
            return;
        }

        const { token } = res.data;

        const decoded = jwt_decode(token);

        if (localStorage.getItem("jwtToken", token))
            localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", token);

        setAuthToken(token);

        store.dispatch({
            type: "SET_CURRENT_USER",
            payload: decoded,
        });

        return true;
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
        return;
    }
};

const uploadDataSave = async (formData) => {
    try {
        var res = await axios.post("/api/games/uploadfile", formData);

        if (!res.data.success) {
            NotificationManager.error("Server Error", "", 3000);
            return;
        }

        store.dispatch({
            type: "SET_CURRENT_GAMELIST",
            payload: res.data.games,
        });
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
    }
};

const updateGame = async (updateData) => {
    try {
        var res = await axios.post("/api/games/updateGame", updateData);

        if (!res.data.status) {
            NotificationManager.error("Server Error", "", 3000);
            return;
        }

        store.dispatch({
            type: "SET_CURRENT_GAMELIST",
            payload: res.data.games,
        });

        NotificationManager.success("updateGame request success", "", 3000);
        return true;
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
        return false;
    }
};

const updateGameKey = async (updateData) => {
    try {
        var res = await axios.post("/api/games/updateApiKey", updateData);
        if (!res.data.status) {
            NotificationManager.error("Server Error", "", 3000);
            return;
        }

        const { key } = res.data;
        return key;
    } catch (err) {
        NotificationManager.error("Community Error", "", 3000);
        return;
    }
};

// User Manage
const setCurrentUser = (decoded) => {
    store.dispatch({
        type: "SET_CURRENT_USER",
        payload: decoded,
    });
};

const updateUserData = async () => {
    try {
        if (!localStorage.getItem("jwtToken")) return;
        var res = await axios.post("/api/users/getUserData");

        if (!res.data.success) {
            NotificationManager.error("Server Error", "", 3000);
            return;
        }

        const { token } = res.data;
        const decoded = jwt_decode(token);

        if (!localStorage.getItem("jwtToken"))
            localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", token);

        setAuthToken(token);
        setCurrentUser(decoded);
    } catch (err) {
        NotificationManager.error("Login Failed", "", 3000);
        localStorage.removeItem("jwtToken");
        setCurrentUser({});
    }
};

const playInfo = async () => {
    try {
        var res = await axios.post("/api/history/getPlayerInfos");
        if (!res.data.success) {
            return false;
        }
        return res.data.result;
    } catch (err) {
        return false;
    }
};

// Token Withdraw
const withdrawRequest = async (withdrawData) => {
    try {
        var res = await axios.post(
            "/api/users/savewithdrawamount",
            withdrawData
        );
        if (!res.data.status) {
            NotificationManager.error("Server Error", "", 3000);
            return;
        }

        const { token } = res.data;
        const decoded = jwt_decode(token);

        // Set token to ls
        if (!localStorage.getItem("jwtToken", token))
            localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", token);

        setAuthToken(token);
        setCurrentUser(decoded);

        NotificationManager.success("Withdraw request success", "", 3000);
    } catch (err) {
        NotificationManager.error(
            err.response.data ? err.response.data : "Withdraw request error",
            "",
            3000
        );
    }
};

// Export Functions
const Action = {
    // User Auth
    register,
    login,
    logout,
    setCurrentUser,
    updateUserData,
    playInfo,
    // Game Manage
    getUserGamelist,
    approveToGame,
    uploadDataSave,
    updateGame,
    updateGameKey,
    // Token Manage
    withdrawRequest,
};

export default Action;
