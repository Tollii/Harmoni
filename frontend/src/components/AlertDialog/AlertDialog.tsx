import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default (props: boolean) => {
  
  return (
    <div>
      <Dialog
        open={props}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ARE YOU SURE YOU WANT TO DELETE THIS EVENT?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  color="primary">
            I REGRET
          </Button>
          <Button  color="primary" autoFocus>
            NO RAGRETS
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
