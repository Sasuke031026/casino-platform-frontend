import React, { useState, useEffect } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import LoginTab from "./loginTab";
import SignUpTab from "./signUpTab";
import "./header.css";

const AntTabs = withStyles({
  root: {
    borderBottom: "2px solid rgb(60, 63, 66)",
  },
  indicator: {
    height: "2px",
    backgroundColor: "var(--block_clr)",
  },
  flexContainer: {
    justifyContent: "center",
  },
})(Tabs);

const AntTab = withStyles({
  root: {
    textTransform: "none",
    minWidth: "50px",
    color: "white!important",
    fontSize: "15px !important",
    "&:focus": {
      color: "var(--block_clr)!important",
    },
    "&:hover": {
      color: "var(--block_clr)!important",
    },
  },
  selected: {
    color: "var(--block_clr)!important",
  },
})((props) => <Tab disableRipple {...props} />);

export default function HeaderModal(props) {
  const { tabValue, handlemodalclose } = props;
  const [isLog, setIsLog] = useState(true);
  const [isReg, setIsReg] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(tabValue);
  }, [tabValue]);

  const handleTabs = (event, newValue) => {
    if (newValue === 0) {
      setValue(newValue);
      setIsLog(true);
      setIsReg(false);
    } else {
      setValue(newValue);
      setIsLog(false);
      setIsReg(true);
    }
  };

  return (
    <Box className="signpagebox">
      <div
        id="sign-dialog-close-btn"
        className="sign-dialog-close-btn"
        onClick={handlemodalclose}
      >
        <i className="fa fa-close"></i>
      </div>
      <Container maxWidth="lg" className="signpagecontainer">
        <div className="sign-logo">
          <Link to="/">
            <img src="assets/logo.png" alt="logo" style={{ height: "100%" }} />
          </Link>
          <span
            style={{
              fontSize: "70px",
              marginLeft: "-60px",
              marginTop: "-60px",
              color: "red",
              fontFamily: "a",
              fontWeight: "50",
            }}
          >
            ATARII
          </span>
        </div>
        <AntTabs value={value} onChange={handleTabs} aria-label="signpageTab">
          <AntTab label="Log In" />
          <AntTab label="Sign Up" />
        </AntTabs>
        {value === 0 ? (
          <LoginTab handlemodalclose={handlemodalclose} />
        ) : (
          <SignUpTab handlemodalclose={handlemodalclose} />
        )}
        {isLog ? (
          <div className="sign-reg-here">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setValue(1);
                setIsLog(false);
                setIsReg(true);
              }}
            >
              Register Here
            </span>
          </div>
        ) : (
          <></>
        )}
        {isReg ? (
          <div className="sign-reg-here">
            Already have an account?{" "}
            <span
              onClick={() => {
                setValue(0);
                setIsLog(true);
                setIsReg(false);
              }}
            >
              Login here
            </span>
          </div>
        ) : (
          <></>
        )}
      </Container>
    </Box>
  );
}
