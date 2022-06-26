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
});
const useStyles = makeStyles((theme) => ({
  fullView: {
    "-webkit-transition": "top 0.1s ease",
    transition: "top 0.2s ease",
    [theme.breakpoints.down("md")]: {
      width: "100vw",
      height: "100vh",
      maxHeight: (props) => `calc(100vh - ${32 - props.scrolled / 5}px)`,
      margin: (props) => 32 - props.scrolled / 5,
      position: "relative",
      top: (props) => props.touchOffset,
    },
  },
}));

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
  const { toggleModal, open, title, children, handleSubmit, btnText } = props;
  const [scrolled, setScrolled] = React.useState();
  const [touch, setTouch] = React.useState(false);
  const [touchOffset, setTouchOffset] = React.useState(0);

  const classes = useStyles({ scrolled, touchOffset });

  return (
    <Dialog
      onClose={toggleModal}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth={true}
      style={{ overflowY: "hidden" }}
      classes={{ paperFullWidth: classes.fullView }}
      onTouchStart={(e) => setTouch(e.touches[0].screenY)}
      onTouchMove={(e) => {
        if (touch && touchOffset > 150) toggleModal();
        console.log("touch", touch);
        setTouchOffset(e.touches[0].screenY - touch);
        console.log(e.touches[0].screenY);
      }}
      onTouchEnd={(e) => {
        setTouchOffset(0);
        setTouch(0);
      }}
    >
      <DialogTitle id="customized-dialog-title" onClose={toggleModal}>
        {title}
      </DialogTitle>
      <DialogContent
        dividers
        onScroll={(e) => {
          setScrolled(e.currentTarget.scrollTop);
        }}
      >
        {children}
      </DialogContent>
      {btnText && (
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            {btnText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CustomModal;
