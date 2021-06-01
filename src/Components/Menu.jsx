import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText  } from '@material-ui/core/';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import {  Link } from 'react-router-dom'
import '../index.css'

;
const useClasses = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    flexGrow: 1
  },
    iconContainer: {
        "&:hover $icon": {
            color: 'red',
        }
    },
    icon: {
        color: 'white',
    },
}))


const Menu = (props) => {
    const classes = useClasses()
    const text = {
        color: 'white'
      }
    return (
        <div className={classes.root}>
         <List>
         <Link  style={{ textDecoration: 'none' }} to="student"> 
             <ListItem button >
               <ListItemIcon> <PersonIcon  className={classes.icon}  /></ListItemIcon>
               <ListItemText style={text} primary="Student" />
             </ListItem> 
         </Link>

         <Link  style={{ textDecoration: 'none' }} to="teacher"> 
             <ListItem button >
               <ListItemIcon className="icon"> <PersonIcon  className={classes.icon}   /></ListItemIcon>
               <ListItemText  style={text} primary="Teacher" />
             </ListItem> 
         </Link>

         <Link  style={{ textDecoration: 'none' }} to="subject"> 
             <ListItem button >
               <ListItemIcon> <ScheduleIcon  className={classes.icon} /></ListItemIcon>
               <ListItemText style={text} primary="Subject" />
             </ListItem> 
         </Link>

         <Link  style={{ textDecoration: 'none' }} to="schedule"> 
             <ListItem button >
               <ListItemIcon> <MenuBookIcon  className={classes.icon} color="primary"  /></ListItemIcon>
               <ListItemText style={text} primary="Schedule" />
             </ListItem> 
        </Link>

         <Link  style={{ textDecoration: 'none' }} to="group"> 
             <ListItem button >
               <ListItemIcon> <GroupIcon  className={classes.icon} color="primary" /></ListItemIcon>
               <ListItemText style={text} primary="Group" />
            </ListItem> 
         </Link>        
      
         </List>
        </div>
    )
}

export default Menu