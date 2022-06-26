import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

import Login from "./Login";
import PreRegister from "./PreRegister";
import Register from "./Register";
import Forgot from "./Forgot";
import SocialLogin from "./SocialLogin";

import fetchy from "../../utils/fetchy";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardRoot: {
    padding: theme.spacing(4),
  },
  topMargin: {
    marginTop: theme.spacing(4),
  },
  socialContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

function LoginRegister() {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const [usernamePlaceholder, setUsernamePlaceholder] = useState(null);
  const classes = useStyles();
  const [request, setRequest] = useState({
    _id: "",
    username: "",
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    password: "",
    passwordVerify: "",
    emailKey: "",
  });

  const handleSubmit = {
    doPreRegister: () => {
      setUsernamePlaceholder(request.email.split("@")[0]);
      fetchy(`/api/v1/users/preregister`, "PUT", request).then((res) => {
        if (res.message === "email exists") {
          alert("Email already exists");
          setUsernamePlaceholder(null);
          return;
        }
        setRequest({ ...request, _id: res._id });
      });
    },
    doRegister: () => {
      if (request.password !== request.passwordVerify) return;
      fetchy(`/api/v1/users/register`, "PUT", request).then((res) => {
        if (res.success) {
          alert("You can now login");
          history.push("/login");
        } else if (res.message === "Username exists") {
          alert("Sorry, Username already exists");
          return;
        }
      });
    },
  };

  const handleClick = {
    login: () => {
      history.push("/login");
    },
    register: () => {
      history.push("/register");
    },
    forgot: () => {
      history.push("/forgot");
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setRequest({ ...request, [name]: value });
  };

  useEffect(() => {
    search === "?email_exists" &&
      dispatch({
        type: "SET_SNACKBAR",
        payload: {
          type: "error",
          message:
            "This Email has already been used. Try logging in via your previous account",
        },
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <Typography variant="h4" style={{ padding: 16 }}>
        Sign {`${pathname === "/register" ? "up" : "in"}`} to Mahaan Express
      </Typography>
      <Divider style={{ width: "60%" }} />
      {request._id ? (
        <Grid container justify="center" className={classes.topMargin}>
          <Grid item md={6} xs={12}>
            <Card classes={{ root: classes.cardRoot }}>
              <Register
                request={request}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={
                  request.passwordVerify
                    ? request.password !== request.passwordVerify
                    : false
                }
                usernamePlaceholder={usernamePlaceholder}
              />
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Card
          classes={{ root: classes.cardRoot }}
          className={classes.topMargin}
        >
          <Grid container spacing={2} justify="center">
            <Grid item md={5} xs={12} className={classes.socialContainer}>
              <Typography component="h5" variant="h5">
                Sign in With
              </Typography>
              <SocialLogin />
            </Grid>
            <Grid item md={7} xs={12}>
              {pathname === "/register" && (
                <>
                  <PreRegister
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                  />
                  {usernamePlaceholder && <p>Preparing...</p>}
                  <Typography variant="subtitle1">
                    Already Have An Account?{" "}
                    <span
                      onClick={handleClick.login}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Login
                    </span>
                  </Typography>
                </>
              )}
              {pathname === "/login" && (
                <>
                  <Login />
                  <Typography variant="subtitle1">
                    Don't Have An Account?{" "}
                    <span
                      onClick={handleClick.register}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Register
                    </span>
                  </Typography>
                  <Typography variant="subtitle1">
                    <span
                      onClick={handleClick.forgot}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Forgot Password?
                    </span>
                  </Typography>
                </>
              )}
              {pathname === "/forgot" && (
                <>
                  <Forgot />
                  <Typography variant="subtitle1">
                    Already Have An Account?{" "}
                    <span
                      onClick={handleClick.login}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      Login
                    </span>
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
}

export default LoginRegister;
