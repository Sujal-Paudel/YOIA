import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./AddOrder.styles";
import { Button, Modal, Input, Grid } from "@material-ui/core";

const OrderForm = (props) => {
  const { itemLabels, handleChange, inputData, singleLine } = props;

  return (
    <form noValidate autoComplete="off">
      {!singleLine ? (
        itemLabels.map((key, i) => (
          <Grid container spacing={2} key={i}>
            <Grid item xs={12} sm={3}>
              <label>{key.pascal}</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Input
                placeholder={key.pascal}
                name={key.name}
                value={inputData[key.name]}
                onChange={handleChange.formInput}
                fullWidth
                multiline={key.name === "description"}
              />
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <label>{itemLabels}</label>
          </Grid>
          {Object.keys(inputData).map((each, i) => (
            <Grid item xs={12} sm={3} key={i}>
              <Input
                placeholder={inputData[i]}
                name={inputData[i]}
                value={inputData[i]}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </form>
  );
};

export default OrderForm;
