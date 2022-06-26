import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./AddClient.styles";
import { Button, Modal, Input, Grid } from "@material-ui/core";

const ClientForm = (props) => {
  const { itemLabels, handleChange, inputData, singleLine } = props;

  return (
    <form noValidate autoComplete="off">
      {itemLabels.map((key, i) => (
        <Grid container spacing={2} key={i}>
          <Grid item xs={12} sm={3}>
            <label>{key.pascal}</label>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Input
              placeholder={key.pascal}
              name={key.name}
              value={inputData[key.name]}
              onChange={handleChange}
              fullWidth
              multiline={key.name === "description"}
            />
          </Grid>
        </Grid>
      ))}
    </form>
  );
};

export default ClientForm;
