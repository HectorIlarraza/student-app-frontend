import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const DialogueBox = ({open, setOpen, deleteUser}) => {

  const handleClose = (e) => {
    if(e.target.id === "confirm"){
        deleteUser();
        console.log("should delete user");
    }

    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this student?"}
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button id="confirm" onClick={(e) => handleClose(e)} autoFocus>
            Confrim
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogueBox;