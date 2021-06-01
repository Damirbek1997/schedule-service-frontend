import React,{useEffect}  from 'react';
import { Button ,FormControl, Select, MenuItem, InputLabel,   makeStyles,Typography, TextField} from '@material-ui/core';
import GetDepartment from './getDepatrment'
import '../index.css'
import axios from 'axios'
import {  Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    customTextField: {
        fontSize: "16px",
        fontWeight: 700,
        color: '#000',
        "& input::placeholder": {
            textOverflow: 'black !important',
            color: '#000',
            fontWeight: 800,
        }
      },
      selectRole: {
          marginLeft: '15px',
          fontSize: "16px",
          fontWeight: 800,
          color: '#000',
      }     
  })); 

export default function  Addgroup ()  {
    const classes = useStyles();
    const [departmentId, setDepartmentId] = React.useState('');
    const [group, setGroup] = React.useState('');
    const [groupList, setGroupList] = React.useState([])
    const [redirectToList, setRedirectToList] = React.useState(false)
    
   const handleSubmit = e => {
        e.preventDefault()
       const data = {
        groupName: e.target.name.value,
        departmentId: departmentId
        }
       e.preventDefault()
       axios.post('https://schedule-service-alatoo.herokuapp.com/groups', data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      }).then(res => {
        setRedirectToList(true)
      })
    }

    const sayHello = (value) => {
        setGroupList(value)
    }
    const getDepartmentId = (id) => {
        setDepartmentId(id)
    };

    if(redirectToList){
      return <Redirect to="/group" />
    }
         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h3" color="primary" align="center" component="h2">
                Add new group
                </Typography>
                    <form onSubmit={handleSubmit}>
        <FormControl fullWidth >
         <div style={{ width: 550 }}>
       
          <TextField 
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          placeholder="Name of group"
          fullWidth
          name="name"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />        
        
 <GetDepartment departmentId={getDepartmentId} getSchadule={sayHello} />  
      
      </div>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" color="primary" >Add </Button>
                    </form>
                </div>
             </div> 
        )
    }
