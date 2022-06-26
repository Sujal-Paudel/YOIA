import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import FacebookIcon from "@material-ui/icons/Facebook";

import GoogleIcon from "../../assets/img/Google.png";

const useStyles = makeStyles((theme) => ({
  google: {
    background: theme.color.google.main,
    color: "white",
    minWidth: 245,
    height: 40,
    justifyContent: "flex-start",
    "&:hover": {
      background: theme.color.google.secondary,
    },
  },
  googleImage: {
    width: 18,
    height: 18,
    background: "white",
  },
  iconContainer: {
    background: "white",
    padding: "6px",
    display: "flex",
    margin: "-5px 0px -5px -5px",
  },
  facebook: {
    background: theme.color.facebook.main,
    color: "white",
    minWidth: 245,
    height: 40,
    "&:hover": {
      background: theme.color.facebook.secondary,
    },
  },
  socialItem: {
    marginTop: theme.spacing(3),
  },
}));
const SocialLogin = () => {
  const classes = useStyles();
  const handleClick = {
    facebook: () => {
      window.location.href = `${process.env.REACT_APP_PROXY_SERVER}/api/v1/oauth/facebook`;
    },
    google: () => {
      window.location.href = `${process.env.REACT_APP_PROXY_SERVER}/api/v1/oauth/google`;
    },
  };
  return (
    <>
      <Grid item md={12} className={classes.socialItem}>
        <Button className={classes.google} onClick={handleClick.google}>
          <div className={classes.iconContainer}>
            <img
              className={classes.googleImage}
              src={GoogleIcon}
              alt="google icon"
            />
          </div>
          <span style={{ paddingLeft: 16 }}>Sign in with Google</span>
        </Button>
      </Grid>
      <Grid item md={12} className={classes.socialItem}>
        <Button className={classes.facebook} onClick={handleClick.facebook}>
          <FacebookIcon />
          <span style={{ paddingLeft: 16 }}>Continue with Facebook</span>
        </Button>
      </Grid>
    </>
  );
};
export default SocialLogin;
