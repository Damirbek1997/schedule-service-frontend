import React from 'react';
import axios from 'axios'
import { Link } from  'react-router-dom'
import {  IconButton,makeStyles, Button, DialogActions, DialogTitle, Slide,  Dialog } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetGroup from '../Components/getGroup'

const useStyles = makeStyles((theme) => ({
  iconPadding: {
    "& .MuiIconButton-root": {
      padding: '0 !important'
    }
  }    
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 const Group = () => {
    const [showList, setShowList] = React.useState(true);
    const [groupList, setGroupList] = React.useState([]);
    const classes = useStyles()
    let showListForms;
     const getGroups = (value) => {
        setGroupList(value)       
     }
     const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

     const deleteGroup = (id, index) => {
     
        setOpen(false);
        axios.delete(`https://schedule-service-alatoo.herokuapp.com/groups/${id}`, {
            headers: {   
                "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"            
              }})
              .then(res => {
                let groups = groupList.map(item => {
                  return Object.assign({}, item)
                });      
                groups.splice(index, 1)
                setGroupList(groups)
              })       
     }
     if(showList){ 
      showListForms = (
        <div>
        <h2 style={{textAlign: 'center'}}>List of groups </h2>
        <div className="scrollbar subject_list" id="style-2">
        <div className="force-overflow">
            <div className="list_head">
                <b>Name</b>
                <div>
                <b>Delete </b>
            </div>
            </div>
            {
                groupList.map((item,index) => {
                    return(
                     <div key={`${index}_listofstjyyudents`} className="user-list-item"> 
                      <span className="user-list-item-name"> {item.groupName} </span>
                      <IconButton  className={classes.iconPadding} aria-label="delete"> 
                      <div>
      <DeleteIcon onClick={handleClickOpen}/>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Remove the group ?"}</DialogTitle>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={() => {deleteGroup(item.id, index)}} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
                    </IconButton>
                      
                  </div>
                    )
                })
            }
        </div>
      </div>
      </div>
      )
    }
    return (
<div>
<div>
        <div className="select_group">
            <GetGroup  getSchadule={getGroups} />
            <Link  style={{ textDecoration: 'none' }} to="addGroup">
          <button className="add_btn"> Add new group</button>
        </Link> 
        </div>
     
</div>
{showListForms}
       
            </div>
    )
}
export default Group