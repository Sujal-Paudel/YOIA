import React from "react";
import { Divider, Grid, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

import noImage from "../../assets/img/noImage.png";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: "relative",
  },
  img: {
    width: "100%",
    height: (props) => props.imgHeight,
  },
  closeButton: {
    position: "absolute",
    right: "0px",
    top: "0px",
    color: "red",
  },
  imageInput: {
    position: "absolute",
    opacity: 0,
    width: "0.1px",
    height: "0.1px",
  },
  imageInputLabel: {
    cursor: "pointer",
  },
  cardRoot: {
    cursor: "pointer",
    transition: "0.5s ease all",
    border: "0.8px solid grey",
    background: "#eee",
    "&:hover": {
      transform: "scale(1.05)",
      background: "rgba(0,0,0,0.08)",
    },
  },
  center: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

export const ImageDisplay = ({ imgHeight, imgSrc, imgRmv }) => {
  const styleProps = { imgHeight };
  const classes = useStyles(styleProps);
  return (
    <div className={classes.imageContainer}>
      <img
        className={classes.img}
        alt="uploaded"
        src={imgSrc}
        id="image-upload"
      />
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={imgRmv}
      >
        <CancelIcon />
      </IconButton>
    </div>
  );
};

export const ImageInput = ({
  id,
  handleChange,
  cardHeight,
  cardMediaHeight,
}) => {
  const classes = useStyles();

  return (
    <>
      <input
        type="file"
        id={`${id}item-input-file`}
        className={classes.imageInput}
        onChange={handleChange}
      />
      <label
        className={classes.imageInputLabel}
        htmlFor={`${id}item-input-file`}
      >
        <Card className={classes.cardRoot} style={{ height: cardHeight }}>
          <CardMedia
            height={cardMediaHeight}
            component="img"
            image={noImage}
            title="Add New Item Image"
          />
          <AddCircleIcon className={classes.center} />
        </Card>
      </label>
    </>
  );
};
