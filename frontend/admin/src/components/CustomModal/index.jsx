import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogPaper: {
    overflowY: "hidden",
  },
});

const useStyles = makeStyles(styles);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: "flex-start",
  },
}))(MuiDialogActions);

const CustomModal = (props) => {
  const { toggleModal, open, title, children, handleSubmit } = props;
  const classes = useStyles();
  return (
    <Dialog
      onClose={toggleModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle id="customized-dialog-title" onClose={toggleModal}>
        {title}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleSubmit} color="primary">
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
