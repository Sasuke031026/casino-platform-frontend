import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { NotificationContainer } from "react-notifications";
import LoadingScreen from "react-loading-screen";

import BlockhainProvider from "./blockchainContexts";
import ScrollToTopBtn from "./components/menu/ScrollToTop";
import Routes from "./routes";

import "react-notifications/lib/notifications.css";

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0, 0), [location]);
  return children;
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <LoadingScreen
      loading={loading}
      bgColor="var(--menu_backclr)"
      spinnerColor="white"
      logoSrc="assets/bfg_back_img.png"
    >
      <BlockhainProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <ScrollToTopBtn />
        <NotificationContainer />
      </BlockhainProvider>
    </LoadingScreen>
  );
}
