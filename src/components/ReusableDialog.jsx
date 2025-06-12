import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ReusableDialog( {dialogProps, openModal, setOpenModal} ) {
  const handleClose = (str) => {
    setOpenModal(false);

    if (str === "execute") {
        dialogProps.callbackFunc();
    };
  };

  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogProps.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogProps.content || "This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose("Do not execute")} variant='contained'>{dialogProps.btn1Content}</Button>
          <Button onClick={(e) => handleClose("execute")} autoFocus variant='contained'>
            {dialogProps.btn2Content}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}