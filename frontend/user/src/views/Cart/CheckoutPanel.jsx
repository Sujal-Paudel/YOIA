import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import fetchy from "../../utils/fetchy";
import { processFlatObject } from "../../utils";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

function CheckoutPanel() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state);

  const inputFields = [
    {
      label: "Name",
      placeHolder: "Full Name",
      state: "newUserDetails.fullName",
    },
    {
      label: "Business Name",
      placeHolder: "Business Name (if any)",
      state: "newUserDetails.businessName",
    },
    {
      label: "Shipping Address",
      placeHolder: "Shipping Address",
      state: "delivery.address",
    },
    {
      label: "Email Address",
      placeHolder: "Your Email Address",
      state: "newUserDetails.email",
    },
    {
      label: "Phone",
      placeHolder: "98********",
      state: "newUserDetails.phone",
    },
    {
      label: "Details",
      placeHolder: "Message you would like to add",
      state: "details",
    },
  ];

  const [orderRequest, setOrderRequest] = useState({
    items: Object.values(cartData),
    delivery: { address: "" },
    details: "",
    newUserDetails: { fullName: "", businessName: "", phone: "", email: "" },
  });

  const handleClick = {
    register: () => {
      history.push("/register");
    },
    login: () => {
      history.push("/login");
    },
    checkout: () => {
      const req = processFlatObject(orderRequest);
      fetchy(`/api/v1/orders/new`, "PUT", req).then(({ success, data }) => {
        if (success) {
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "success",
              message: `Your order has been registered succcessfully`,
            },
          });
          dispatch({
            type: "RESET_CART_DATA",
          });
          history.push("/");
        }
      });
    },
  };

  return (
    <Grid
      item
      sm={12}
      md={4}
      className={classes.shippingProfile}
      style={{ padding: 0, display: "flex", flexDirection: "column" }}
    >
      <Grid item md={12} style={{ padding: 16, paddingTop: 32 }}>
        <Typography variant="h5">Your Shipping Address</Typography>
        <hr />
        <form className={classes.form} noValidate autoComplete="off">
          {inputFields.map((field) => (
            <TextField
              key={field.label}
              label={field.label}
              style={{ margin: 8 }}
              placeholder={field.placeHolder}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setOrderRequest({
                  ...orderRequest,
                  [field.state]: e.currentTarget.value,
                });
              }}
            />
          ))}
        </form>
        <Button
          variant="outlined"
          className={classes.shippingBtns}
          onClick={handleClick.checkout}
        >
          Checkout
        </Button>
      </Grid>
      <Grid item md={12} style={{ flexGrow: 1 }} />
      <Grid item md={12} className={classes.shippingBottom}>
        <Typography variant="subtitle1">
          Or checkout via MahaanExpress Account
        </Typography>
        <br />
        <div>
          <Button
            variant="outlined"
            className={classes.shippingBtns}
            onClick={handleClick.register}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            className={classes.shippingBtns}
            onClick={handleClick.login}
          >
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default CheckoutPanel;
