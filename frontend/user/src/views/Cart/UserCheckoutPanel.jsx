import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import fetchy from "../../utils/fetchy";
import { getProps, processFlatObject } from "../../utils";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

function UserCheckoutPanel() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartData, userDetails } = useSelector((state) => state);
  const [editable, setEditable] = useState({
    "Shipping Address": "",
    Details: "",
  });
  const inputFields = [
    {
      label: "Name",
      placeHolder: "Full Name",
      value: userDetails.fullName,
    },
    {
      label: "Business Name",
      placeHolder: "Business Name (if any)",
      value: userDetails.businessName,
    },
    {
      label: "Shipping Address",
      placeHolder: "Shipping Address",
      value: userDetails.address,
      state: "delivery.address",
    },
    {
      label: "Email Address",
      placeHolder: "Your Email Address",
      value: userDetails.email,
    },
    {
      label: "Phone",
      placeHolder: "98********",
      value: userDetails.phone,
    },
    {
      label: "Details",
      placeHolder: "Message you would like to add",
      state: "details",
    },
  ];

  const [orderRequest, setOrderRequest] = useState({
    items: Object.values(cartData),
    delivery: { address: userDetails.address },
    details: "",
  });

  const handleClick = {
    checkout: () => {
      console.log(orderRequest);
      const req = processFlatObject(orderRequest);
      fetchy(`/api/v1/orders`, "PUT", req).then(({ success, data }) => {
        console.log("data", data);
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
        <Typography variant="h6">(From your profile)</Typography>
        <hr />
        <form className={classes.form} noValidate autoComplete="off">
          {inputFields.map((field) => (
            <TextField
              key={field.label}
              label={field.label}
              style={{ margin: 8 }}
              placeholder={field.placeHolder}
              margin="normal"
              fullWidth
              disabled={!!field.value} // wwarning
              InputLabelProps={{
                shrink: true,
              }}
              value={field.state ? editable[field.label] : field.value || " "}
              onChange={(e) => {
                setOrderRequest({
                  ...orderRequest,
                  [field.state]: e.currentTarget.value,
                });
                field.state &&
                  setEditable({
                    ...editable,
                    [field.label]: e.currentTarget.value,
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
    </Grid>
  );
}

export default UserCheckoutPanel;
