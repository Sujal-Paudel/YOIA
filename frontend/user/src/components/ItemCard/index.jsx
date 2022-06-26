import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

//styles
import styles from "./index.styles";

import { defaultDisplayImage, imageSrcRoute } from "../../assets/img";

const useStyles = makeStyles(styles);

//Requires it to be wrapped by a div with styles=> display: "inline-block",height: "100%", width: "100%",
//See implementation of all Products in Home
const ItemSlider = (props) => {
  const { item, allProducts } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { langPreference } = useSelector((state) => state);

  const classes = useStyles({ allProducts });

  const handleClick = {
    addToCompare: (item) => {
      dispatch({ type: "ADD_COMPARE", payload: item });
    },
  };
  return (
    <Card
      classes={{ root: classes.root }}
      onClick={() => history.push(`/item/${item._id}`)}
    >
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
        <Typography
          gutterBottom
          variant="subtitle2"
          component="p"
          className={classes.truncateName}
        >
          {langPreference === "EN" ? item.itemName : item.nepaliItemName}
        </Typography>
        <Typography variant="h6" component="p">
          Rs.{item.rate}
        </Typography>
      </CardContent>
      <CardActions classes={{ root: classes.cardAction }}>
        <Button size="small" color="primary">
          More >
        </Button>
        <IconButton
          aria-label="Add To Cart"
          aria-haspopup="true"
          onClick={(e) => {
            e.stopPropagation();
            handleClick.addToCompare(item);
            dispatch({
              type: "SET_SNACKBAR",
              payload: {
                type: "success",
                message: `${item.itemName} has been added for COMPARISON`,
              },
            });
          }}
          color="inherit"
          className={classes.iconButton}
        >
          <Tooltip title="Add to Compare" aria-label="Compare">
            <AddCircleIcon />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default ItemSlider;
