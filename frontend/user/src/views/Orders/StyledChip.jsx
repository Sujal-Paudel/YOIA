import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";

import LoopIcon from "@material-ui/icons/Loop";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
const ChipStyles = (theme) => ({
  root: {
    background: (props) =>
      (props.status === "pending" && "#f44336") ||
      (props.status === "reviewed" && "#ff9f0e") ||
      (props.status === "delivery" && theme.palette.primary.main) ||
      (props.status === "completed" && "green"),
    color: "white",
  },
});

const StyledChip = withStyles(ChipStyles)((props) => {
  const { classes, status, ...other } = props;
  const icon =
    (status === "pending" && <LoopIcon style={{ color: "white" }} />) ||
    (status === "delivery" && (
      <LocalShippingIcon style={{ color: "white" }} />
    )) ||
    (status === "reviewed" && (
      <VerifiedUserIcon style={{ color: "white" }} />
    )) ||
    (status === "completed" && <CheckCircleIcon style={{ color: "white" }} />);

  return <Chip classes={{ root: classes.root }} icon={icon} {...other} />;
});

export default StyledChip;
