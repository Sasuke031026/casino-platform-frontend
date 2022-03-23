import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

import Header from "./header";

import Footer from "./footer";
import { Rotate } from "react-awesome-reveal";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

function ResponsiveDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const drawer = (
        <>
            <div style={{ paddingLeft: "15px" }}>
                <Link to="/">
                    <img src="/assets/logo.png" alt="logo" />
                </Link>
            </div>
            <div style={{ padding: "30px" }} className="noselect">
                <List>
                    <ListItem className="MenuButton">
                        <ListItemIcon>
                            <HomeIcon className="MenuIcon" />
                        </ListItemIcon>
                        <Link to="/" className="MenuIcon">
                            <ListItemText primary="Home" />
                        </Link>
                    </ListItem>
                    <ListItem className="MenuButton">
                        <ListItemIcon className="MenuIcon">
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <Link to="/mypage" className="MenuIcon">
                            <ListItemText primary="My Page" />
                        </Link>
                    </ListItem>
                    <ListItem className="MenuButton">
                        <ListItemIcon className="MenuIcon">
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <Link to="/farm" className="MenuIcon">
                            <ListItemText primary="Farming" />
                        </Link>
                    </ListItem>
                    <ListItem className="MenuButton">
                        <ListItemIcon className="MenuIcon">
                            <ContactSupportIcon />
                        </ListItemIcon>
                        <Link to="/howto" className="MenuIcon">
                            <ListItemText primary="How to" />
                        </Link>
                    </ListItem>
                </List>
            </div>
        </>
    );

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    open={open}
                    style={{ backgroundColor: "transparent" }}
                >
                    <Toolbar>
                        <IconButton
                            color="error"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <FormatListBulletedIcon />
                        </IconButton>
                        <Header />
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton
                            onClick={handleDrawerClose}
                            style={{ color: "darkred" }}
                        >
                            {theme.direction === "ltr" ? (
                                <DoubleArrowIcon
                                    style={{ transform: "Rotate(180deg)" }}
                                />
                            ) : (
                                <DoubleArrowIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    {drawer}
                </Drawer>
            </Box>
            {/* Main Pages */}
            <Outlet />

            {/* Footer */}
            <Footer />
        </>
    );
}

export default ResponsiveDrawer;
