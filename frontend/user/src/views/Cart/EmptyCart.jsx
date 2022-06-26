import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { emptyCartIcon } from "../../assets/img";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

function EmptyCart() {
  const history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.emptyCartContainer}>
      <Typography
        variant="subtitle1"
        className={classes.turncateName}
        component="p"
        style={{ textAlign: "center" }}
      >
        Your Shopping Cart is Empty
      </Typography>
      <img src={emptyCartIcon} className={classes.emptyCart} alt="empty Cart" />
      <Button
        variant="outlined"
        className={classes.shoppingBtn}
        onClick={() => history.push("/")}
      >
        Go to Shopping
      </Button>
    </div>
  );
}

export default EmptyCart;
