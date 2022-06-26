import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import fetchy from "../../utils/fetchy";
import { fetchUserProfile } from "../../actions";

import styles from "./form.styles";

const useStyles = makeStyles(styles);

function Login(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loaded, setloaded] = useState(false);
  const [error, setError] = useState("");
  const req = {
    identifier: "",
    password: "",
  };

  function doLogin() {
    setloaded(true);
    fetchy(`/api/v1/users/login`, "POST", req).then((res) => {
      setloaded(false);
      if (res.success) {
        dispatch({
          type: "LOGGED_IN",
        });
        dispatch(fetchUserProfile());
        history.push("/account");
      } else {
        setError("Username and Passwords don't match.");
      }
    });
  }
  console.log(req);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    req[name] = value;
    setError("");
  };

  return (
    <>
      {/** TODO <prajwal> Work on this progress loader */}
      {loaded && "loading..."}
      <Typography component="h5" variant="h5">
        Or Login with Email
      </Typography>
      {error && (
        <Typography variant="subtitle1" color="error" style={{ marginTop: 16 }}>
          {error}
        </Typography>
      )}

      <form
        className={classes.form}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          doLogin(req);
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="identifier"
          error={!!error}
          fullWidth
          onChange={handleChange}
          label="Username or Email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          error={!!error}
          required
          fullWidth
          name="password"
          onChange={handleChange}
          type="password"
          label="Password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Next
        </Button>
      </form>
    </>
  );
}

export default Login;
