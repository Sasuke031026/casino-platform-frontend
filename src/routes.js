import React, { useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import jwt_decode from "jwt-decode";
import { init } from "aos";
// layouts
import Sidebar from "./components/menu/Sidebar";
import Home from "./components/pages/home";
import MyPage from "./components/pages/myPage/MyPage";
import Farm from "./components/pages/farm/Farm";
import FarmItem from "./components/pages/farm/FarmItem";
import GameSubmit from "./components/pages/myPage/GameSubmit";
import EditGame from "./components/pages/myPage/EditGame";
import HowTo from "./components/pages/how/howto";
import IframeBlock from "./components/pages/IframeBlock/IframeBlock";
import PageNotFound from "./components/components/Error/PageNotFound";

import Action from "./Service/action";
// ----------------------------------------------------------------------

export default function Router() {
  const wallet = useWallet();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token
    if (localStorage.getItem("jwtToken") && wallet.status === "connected") {
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.getItem("jwtToken"));

      // Set user and isAuthenticated
      dispatch({
        type: "SET_CURRENT_USER",
        payload: decoded,
      });

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        Action.logout();

        // Redirect to login
        window.location.href = "/";
      } else Action.updateUserData();
    }
  }, [wallet.status]);

  useEffect(() => {
    Action.getUserGamelist();
    init();
    setInterval(() => {
      Action.updateUserData();
    }, 5000);
  }, []);

  return useRoutes([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        { path: "/", element: <Home /> },
        { path: "mypage", element: <MyPage /> },
        { path: "farm", element: <Farm /> },
        { path: "farming/:poolAddress", element: <FarmItem /> },
        { path: "upload-game", element: <GameSubmit /> },
        { path: "upload-game/:poolAddress", element: <EditGame /> },
        { path: "howto", element: <HowTo /> },
        { path: "IframeBlock/:poolAddress", element: <IframeBlock /> },
        { path: "404", element: <PageNotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
