import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { ArrowLeft } from "@material-ui/icons";

import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import UserCheckoutPanel from "./UserCheckoutPanel";
import CheckoutPanel from "./CheckoutPanel";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

function Cart() {
  const history = useHistory();
  const { isLogged, cartData } = useSelector((state) => state);
  const classes = useStyles();

  const ShopButton = () => (
    <div style={{ marginTop: 16 }}>
      <Button
        style={{ padding: 8, margin: 0 }}
        className={classes.shippingBtns}
        variant="outlined"
        onClick={() => history.push("/")}
      >
        <ArrowLeft />
        Continue Shopping
      </Button>
    </div>
  );
  return (
    <Container maxWidth="lg" className={classes.root}>
      {Object.entries(cartData).length ? (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="h5">Your Shopping Cart</Typography>
            <hr />
            <CartItems cartData={cartData} />
            <Typography variant="h6" component="p">
              Grand Total: Rs.{" "}
              {Object.values(cartData).reduce(
                (a, e) => a + e.quantity * e.rate,
                0
              )}
            </Typography>
            <ShopButton />
            <Hidden smUp>
              <Typography variant="h5">or Checkout below</Typography>
            </Hidden>
          </Grid>
          {isLogged ? <UserCheckoutPanel /> : <CheckoutPanel />}
        </Grid>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
}

export default Cart;
