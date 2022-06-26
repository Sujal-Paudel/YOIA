import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import styles from "./index.styles";

const useStyles = makeStyles(styles);

const ItemDescription = ({ itemDetail }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { langPreference, languageData } = useSelector((state) => state);

  const [editableQuantity, setEditableQuantity] = useState(0);

  useEffect(() => {
    setEditableQuantity(itemDetail ? itemDetail.minOrder : 1);
  }, [itemDetail]);

  const handleClick = {
    addToCart: (item) => {
      const temp = { ...itemDetail };
      temp.quantity = editableQuantity;
      dispatch({ type: "UPDATE_CART", payload: temp });
      history.push("/cart");
    },
  };

  const handleChange = (e) => {
    if (+e.currentTarget.value < itemDetail.minOrder) {
      setEditableQuantity(itemDetail.minOrder);
      return;
    }
    setEditableQuantity(e.currentTarget.value);
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        {langPreference === "EN"
          ? itemDetail.itemName
          : itemDetail.nepaliItemName}
      </Typography>
      <Divider />
      <Typography
        variant="subtitle1"
        component="h3"
        classes={{ root: classes.details }}
      >
        Price: Rs. {itemDetail.rate}{" "}
        <span style={{ color: "red", textDecoration: "line-through" }}>
          {itemDetail.marketRate}
        </span>{" "}
        <br />
        Category: {itemDetail.category}
        <br />
        Product Code: {itemDetail.itemCode}
        <br />
        Tags:{" "}
        {itemDetail.tags.map((tag, index) =>
          index < itemDetail.tags.length - 1 ? `${tag},` : tag
        )}
        <br />
        Description:{itemDetail.description}
      </Typography>
      <Typography
        variant="subtitle1"
        component="h4"
        style={{ marginTop: 15, color: "#707070" }}
      >
        Quantity{" "}
        <IconButton
          aria-label="Decrease Quantity"
          aria-haspopup="true"
          color="inherit"
          className={classes.iconButton}
          onClick={() => setEditableQuantity(editableQuantity - 1)}
          disabled={editableQuantity === itemDetail.minOrder}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <TextField
          id="outlined-required"
          type="number"
          value={editableQuantity}
          variant="outlined"
          size="small"
          style={{ width: 100 }}
          onChange={handleChange}
        />
        <IconButton
          aria-label="Increase Quantity"
          aria-haspopup="true"
          color="inherit"
          className={classes.iconButton}
          onClick={() => setEditableQuantity(editableQuantity + 1)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Typography>
      <br />
      <div>
        <Button
          variant="outlined"
          className={classes.addToCartBtn}
          onClick={() => handleClick.addToCart(itemDetail)}
        >
          {`+ ${languageData["Order Now"]}`}
        </Button>
      </div>
    </>
  );
};
export default ItemDescription;
