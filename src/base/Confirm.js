import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Confirm(props) {
  //const [open, setOpen] = React.useState(props.open);


/*
  const handleClickOpen = () => {
    setOpen(true);
  };
  */
/*
  const handleClose = () => {
    props.handleClose();
  };
*/
  return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.text}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>No</Button>
          <Button onClick={props.handleConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}
