import React from "react";
import { useDispatch } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import LoopIcon from "@material-ui/icons/Loop";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

import fetchy from "../../utils/fetchy";

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
  const { classes, status, row, ...other } = props;

  const dispatch = useDispatch();

  const icon =
    (status === "pending" && <LoopIcon style={{ color: "white" }} />) ||
    (status === "delivery" && (
      <LocalShippingIcon style={{ color: "white" }} />
    )) ||
    (status === "reviewed" && (
      <VerifiedUserIcon style={{ color: "white" }} />
    )) ||
    (status === "completed" && <CheckCircleIcon style={{ color: "white" }} />);

  const handleClick = {
    updateStatus: (row) => {
      console.log(row);
      const newStatus = row.status === "pending" ? "completed" : "pending";
      fetchy(`/api/v1/admin/orders`, "PATCH", {
        _id: row._id,
        status: newStatus,
      }).then(({ success }) => {
        if (success) {
          dispatch({
            type: "UPDATE_ORDERS",
            payload: { ...row, status: newStatus },
          });
          dispatch({
            type: "SET_SNACKBAR",
            payload: {
              type: "success",
              message: `Status updated successfully`,
            },
          });
        }
      });
    },
  };

  return (
    <Chip
      onClick={() => handleClick.updateStatus(row)}
      classes={{ root: classes.root }}
      icon={icon}
      {...other}
    />
  );
});

export default StyledChip;
