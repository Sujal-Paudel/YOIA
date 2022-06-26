import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./form.styles";

const useStyles = makeStyles(styles);

function Register(props) {
  const classes = useStyles();
  const {
    request,
    handleChange,
    handleSubmit,
    usernamePlaceholder,
    error,
  } = props;

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit.doRegister();
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="fullName"
        label="Full Name"
        value={request.fullName}
        disabled
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="email"
        type="email"
        label="Email"
        value={request.email}
        disabled
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="username"
        onChange={handleChange}
        label={`Username like: ${usernamePlaceholder}`}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="phone"
        onChange={handleChange}
        label="Phone"
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="businessName"
        onChange={handleChange}
        label="Business Name (if any)"
      />
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
        error={error}
        helperText={error && "Passwords do not Match"}
        required
        fullWidth
        onChange={handleChange}
        label="Confirm Password"
        type="password"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="emailKey"
        onChange={handleChange}
        label="Code sent to your email"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={error}
      >
        Next
      </Button>
    </form>
  );
}

export default Register;
