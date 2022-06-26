import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./form.styles";

const useStyles = makeStyles(styles);

function PreRegister(props) {
  const classes = useStyles();
  const { handleSubmit, handleChange } = props;

  return (
    <>
      <Typography component="h5" variant="h5">
        Or Register with Email
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit.doPreRegister();
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="fullName"
          label="Full Name"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
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

export default PreRegister;
