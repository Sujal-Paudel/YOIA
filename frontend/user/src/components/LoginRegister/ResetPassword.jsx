import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import fetchy from "../../utils/fetchy";

import styles from "./form.styles";

const useStyles = makeStyles(styles);

function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();

  const { resetKey } = useParams();
  const [loaded, setloaded] = useState(false);
  const [error, setError] = useState("");

  const [req, setReq] = useState({
    resetKey,
    password: "",
    passwordVerify: "",
  });

  const handleSubmit = {
    resetPassword: () => {
      if (req.password !== req.passwordVerify) return;
      fetchy(`/api/v1/users/resetpassword`, "PATCH", req).then(
        ({ success }) => {
          if (success) {
            alert("Password has been reset. You can now login");
            history.push("/login");
          }
        }
      );
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setReq({ ...req, [name]: value });
    setError("");
  };

  return (
    <>
      {/** TODO <prajwal> Work on this progress loader */}
      {loaded && "loading..."}
      <Typography component="h5" variant="h5">
        ResetPassword
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
          handleSubmit.resetPassword();
        }}
      >
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          onChange={handleChange}
          label="Password"
          type="password"
        />
        <TextField
          variant="outlined"
          margin="normal"
          name="passwordVerify"
          error={
            req.passwordVerify ? req.password !== req.passwordVerify : false
          }
          helperText={error && "Passwords do not Match"}
          required
          fullWidth
          onChange={handleChange}
          label="Confirm Password"
          type="password"
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

export default ResetPassword;
