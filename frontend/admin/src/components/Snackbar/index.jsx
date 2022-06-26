import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

function GrowTransition(props) {
  return <Grow {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  bg: {
    backgroundColor: (props) => {
      if (props.backgroundColor)
        return props.backgroundColor
          ? theme.palette[props.backgroundColor].main
          : theme.palette.success.main;
    },
  },
}));

//@param {string} type - "success", "error","warning","info"
const CustomSnackbar = ({ type, message, open, handleClose }) => {
  const props = { backgroundColor: type };
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Snackbar
        message={message}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        ContentProps={{
          classes: {
            root: classes.bg,
          },
        }}
        TransitionComponent={GrowTransition}
        action={
          <React.Fragment>
            {/* Future Feature */}
            {/* <Button color="secondary" size="small" onClick={handleRedo}>
              UNDO
            </Button> */}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
export default CustomSnackbar;
