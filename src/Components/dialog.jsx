import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
export default function ResponsiveDialog({remove, userRole,deleted}) {
 const [open, setOpen] = React.useState(false);
  let linkTo;
  let query;
  switch(userRole){
    case 3 : 
      linkTo = '/users/student'
      query = 'studentId'
    break;
    case 2 : 
      linkTo = '/users/teacher'
      query = 'teacherId'
    break;
    case 'subject' : 
      linkTo = `/subjects/${remove}`
      query = ''
    break;
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeUser = () => {  
    deleted(remove) 
    axios.delete(`https://schedule-service-alatoo.herokuapp.com${linkTo}`, 
    {params: {[query]: remove}})
      .then(response => {        
      })
      .catch(error => {
        console.log(error)
      })    
    setOpen(false);
  }
  return (
    <div>
       <IconButton onClick={handleClickOpen} aria-label="delete">
                <DeleteIcon />
        </IconButton> 

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{" Remove user ?"}</DialogTitle>
        
        <DialogActions>
          <Button autoFocus  onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={removeUser} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
