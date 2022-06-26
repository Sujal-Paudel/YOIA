import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

import clsx from "clsx";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";

import PhoneIcon from "@material-ui/icons/Phone";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

import { drawerWidth } from "../../styles/shared.styles";

import { logo } from "../../assets/img";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: theme.color.main,
    alignItems: "center",

    padding: theme.spacing(4),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerFoot: {
    padding: 0,
  },
  service: {
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      justifyContent: "center",
    },
  },
  bottomNav: {
    display: "flex",
    "& a": {
      textDecoration: "none",
      color: "black",
      paddingRight: theme.spacing(2),
    },
  },
  contact: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
      justifyContent: "center",
    },
    "@media (max-width:395px)": {
      flexBasis: "100%",
      maxWidth: "100%",
    },
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  btmRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Footer = () => {
  const accountMatch = useRouteMatch("/account");
  const styleProps = { isAccount: accountMatch };
  const classes = useStyles(styleProps);

  return (
    <Paper className={classes.footer} elevation={4}>
      <Container maxWidth="lg" style={{ padding: 0 }}>
        <Grid container spacing={4}>
          <Grid item sm={12} md={4}>
            <div style={{ display: "flex" }}>
              <img
                src={logo}
                alt="Company Logo"
                style={{ width: 50, height: 50, marginRight: 8 }}
              />
              <div>
                <Typography variant="h5">Mahaan Express</Typography>
                <Typography variant="h6">4 Hour Groceries Delivery</Typography>
              </div>
            </div>
            <Typography variant="subtitle1">
              We provide branded and quality products and deliver to your home with no
              extra charge.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={4} className={classes.contact}>
            <div style={{ marginRight: 32 }}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="subtitle1">
                <PhoneIcon fontSize="small" />
                <a href="tel:+9779813189306">9813189306</a>
              </Typography>
              {/* <Typography variant="subtitle1">
                <PhoneIcon fontSize="small" />
                <a href="tel:+9779813189503">9813189503</a>
              </Typography>
              <Typography variant="subtitle1">
                <PhoneIcon fontSize="small" />
                <a href="tel:+9779813189306">9813189306</a>
              </Typography> */}
            </div>
          </Grid>

          <Grid item xs={6} sm={6} md={4} className={classes.service}>
            <Typography variant="h6">Services</Typography>
            <Typography variant="subtitle1">Free Delivery</Typography>
            <Typography variant="subtitle1">Online Shopping</Typography>
            <Typography variant="subtitle1">Branded &amp; Quality Products</Typography>
            <Typography variant="subtitle1">Daily Market Update</Typography>
            <br />
          </Grid>

          <Grid container>
            <Grid item sm={4}>
              <div className={classes.bottomNav}>
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/cart">SHOP</NavLink>
                <NavLink to="/login">ACCOUNT</NavLink>
              </div>
              <p>Version: {process.env.REACT_APP_VERSION} </p>
              <p>&copy;{new Date().getFullYear()} All Right Reserved Mahaan Express </p>
            </Grid>
            {/* <div style={{ flexGrow: 1 }} />
            <Grid item sm={6}>
              <p style={{ float: "right" }}>
                Made with &#10084; by{" "}
                <a style={{ color: "black" }} href="https://ranga.com.np/">
                  Ranga Incorporated Pvt. Ltd.
                </a>
              </p>
            </Grid> */}
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
export default Footer;
