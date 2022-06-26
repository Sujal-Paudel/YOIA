import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//@params {string} choice1 ==> Negative choice
//@params {string} choice2 ==> Positive Choice
//@params {Object with function} handleClick ==> handleClick.closeAlert, handleClick.choice
//See the implementation in src/views/DebitCredit/OneParty.jsx
const Alert = (props) => {
  const {
    open,
    titleMessage,
    subMessage,
    choice1, // Should be Negative Choice
    choice2, //should be Positive Choice
    handleClick,
  } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClick.closeAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleMessage}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {subMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick.choice(false)} color="primary">
            {/* no */}
            {choice1}
          </Button>
          <Button
            onClick={() => handleClick.choice(true)}
            color="primary"
            autoFocus
          >
            {/* yes */}
            {choice2}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Alert;
