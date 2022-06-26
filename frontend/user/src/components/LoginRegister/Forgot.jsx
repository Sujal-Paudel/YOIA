import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import fetchy from "../../utils/fetchy";

import styles from "./form.styles";

const useStyles = makeStyles(styles);

function Forgot() {
  const history = useHistory();
  const classes = useStyles();
  const [loaded, setloaded] = useState(false);
  const [error, setError] = useState("");
  const req = {
    username: "",
    email: "",
    fullName: "",
  };

  function doForgot() {
    setloaded(true);
    console.log(req);
    fetchy(`/api/v1/users/forgot`, "PUT", req).then((res) => {
      setloaded(false);
      if (res.success) {
        alert(`Reset link is sent to ${req.email}`);
        history.push("/account");
      }
    });
  }

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
        Forgot Password
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
          doForgot();
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="username"
          error={!!error}
          fullWidth
          onChange={handleChange}
          label="Username"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="email"
          error={!!error}
          fullWidth
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="outlined"
          margin="normal"
          name="fullName"
          error={!!error}
          fullWidth
          onChange={handleChange}
          label="FullName"
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

export default Forgot;
