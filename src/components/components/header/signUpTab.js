import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import Action from "../../../Service/action";
import "./header.css";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "var(--block_clr)",
      fontSize: "15px !important",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "var(--block_clr)",
      fontSize: "15px !important",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
      fontSize: "15px !important",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "12px !important",
    },
    "& legend": {
      width: "fit-content !important",
    },
    "& legend > span": {
      fontSize: "10px !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "var(--menu_list_clr)",
        fontSize: "15px !important",
      },
      "&:hover fieldset": {
        borderColor: "var(--hover_clr)",
        fontSize: "15px !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--block_clr)",
        fontSize: "15px !important",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "var(--menu_list_clr)",
      fontSize: "15px !important",
      overflowWrap: "break-word",
    },
  },
})(TextField);

export default function SignUpTab(props) {
  const { handlemodalclose } = props;
  const wallet = useWallet();
  const user = useSelector((state) => state.auth);
  const [signstatus, setSignstatus] = useState({
    msg: "Welcome to a ATARI casino",
    name: "",
    email: "",
    signature: "",
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      handlemodalclose();
    }
  }, [user.isAuthenticated]);

  useEffect(() => {
    if (wallet.status === "error") {
      NotificationManager.error("please connect to correct chain", "", 3000);
    }
  }, [wallet.status]);

  const getSignature = async ({ msg, name, email }) => {
    try {
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(signstatus.msg);

      Action.register({ signature, msg, name, email });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        reg_username: "",
        reg_email: "",
      }}
      validationSchema={Yup.object().shape({
        reg_username: Yup.string().max(255).required("Useranme is required"),
        reg_email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={(e) => {
        getSignature({
          msg: signstatus.msg,
          name: e.reg_username,
          email: e.reg_email,
        });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
        isValid,
      }) => (
        <form onSubmit={handleSubmit}>
          <CssTextField
            error={Boolean(touched.reg_username && errors.reg_username)}
            fullWidth
            helperText={touched.reg_username && errors.reg_username}
            label="Username"
            margin="normal"
            name="reg_username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.reg_username}
            variant="outlined"
            autoComplete="off"
          />
          <CssTextField
            error={Boolean(touched.reg_email && errors.reg_email)}
            fullWidth
            helperText={touched.reg_email && errors.reg_email}
            label="Email Address"
            margin="normal"
            name="reg_email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.reg_email}
            variant="outlined"
            autoComplete="off"
          />
          <Box sx={{ py: 2 }}>
            {wallet.status === "connected" ? (
              <Button
                className={
                  !isValid ? "login-disable-btn" : "login-enable-btn signup"
                }
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
            ) : (
              <Button
                className="login-enable-btn signup"
                color="primary"
                fullWidth
                size="large"
                type="button"
                variant="contained"
                onClick={() => {
                  wallet.connect();
                }}
              >
                wallet connect
              </Button>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}
