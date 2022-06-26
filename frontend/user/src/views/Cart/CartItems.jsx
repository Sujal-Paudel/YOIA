import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import Alert from "../../components/Alert";

import { defaultDisplayImage, imageSrcRoute } from "../../assets/img";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

function CartItems({ cartData }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { langPreference } = useSelector((state) => state);
  const classes = useStyles();

  const [alert, setAlert] = useState({ open: false, data: null });

  const handleClick = {
    addToCart: (item) => {
      dispatch({ type: "ADD_CART_DATA", payload: item });
    },
    removeFromCart: (item) => {
      dispatch({ type: "SUBTRACT_CART_DATA", payload: item });
    },
    openAlert: (item) => {
      setAlert({ open: true, data: item });
    },
    closeAlert: () => {
      setAlert({ open: false, data: null });
    },
    choice: (remove) => {
      if (remove) dispatch({ type: "DELETE_CART_DATA", payload: alert.data });
      setAlert({ open: false, data: null });
    },
  };

  const handleChange = (e, item) => {
    const temp = { ...item };
    temp.quantity = e < item.minOrder ? item.minOrder : e;
    dispatch({ type: "UPDATE_CART", payload: temp });
  };

  return (
    <>
      <Alert
        titleMessage="Remove Item from cart?"
        choice1="Don't remove"
        choice2="Remove"
        open={alert.open}
        handleClick={handleClick}
      />
      {Object.values(cartData).map((item) => (
        <Card key={item._id} classes={{ root: classes.cardRoot }}>
          <div className={classes.media}>
            <img
              src={`${
                item.image[0]
                  ? imageSrcRoute + "/" + item.image[0]
                  : defaultDisplayImage
              }`}
              alt={item.itemname}
              className={classes.productImage}
            />
          </div>
          <CardContent classes={{ root: classes.cardContent }}>
            <div onClick={() => history.push(`/item/${item._id}`)}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="p"
                className={classes.truncateName}
              >
                {langPreference === "EN" ? item.itemName : item.nepaliItemName}
              </Typography>
              <Typography variant="caption" component="p">
                Product Code: {item.itemCode}
              </Typography>
            </div>
            <div>
              <IconButton
                aria-label="Increase Quantity"
                aria-haspopup="true"
                color="inherit"
                className={classes.deleteIcon}
                onClick={() => handleClick.openAlert(item)}
              >
                <DeleteOutlinedIcon fontSize="small" />
                <Typography variant="caption" component="p">
                  Remove
                </Typography>
              </IconButton>
            </div>
          </CardContent>
          <CardContent>
            <IconButton
              aria-label="Decrease Quantity"
              aria-haspopup="true"
              color="inherit"
              className={classes.iconButton}
              disabled={item.quantity === item.minOrder}
              onClick={() => handleClick.removeFromCart(item)}
            >
              <RemoveCircleOutlineIcon fontSize="small" />
            </IconButton>
            <TextField
              value={item.quantity}
              variant="outlined"
              size="small"
              margin="dense"
              type="number"
              style={{ width: 80 }}
              onChange={(e) => handleChange(e.currentTarget.value, item)}
            />
            <IconButton
              aria-label="Increase Quantity"
              aria-haspopup="true"
              color="inherit"
              className={classes.iconButton}
              onClick={() => handleClick.addToCart(item)}
            >
              <AddCircleOutlineIcon fontSize="small" />
            </IconButton>
            {item.minOrder > 1 && (
              <div style={{ textAlign: "center" }}>
                <Typography variant="caption">
                  Min Order: {item.minOrder}
                </Typography>
              </div>
            )}
          </CardContent>
          <CardContent>
            <Typography
              variant="subtitle1"
              component="p"
              className={classes.price}
            >
              Rs. {item.quantity * item.rate}
            </Typography>
            <Typography varaint="subtitle2" className={classes.marketRate}>
              <span className={classes.marketRatePrice}>
                {item.rate < item.marketRate &&
                  "Rs." + item.quantity * item.marketRate}
              </span>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default CartItems;
