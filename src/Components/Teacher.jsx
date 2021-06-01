import React  from 'react';
import { Button ,FormControl,  makeStyles,Typography, TextField} from '@material-ui/core';
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
      },
     
  }));
  

export default function  AddTeacher ()  {
    const classes = useStyles();

    const [redirectToList, setRedirectToList] = React.useState('');
  

   const handleSubmit = e => {
        e.preventDefault()
       const data = {
        email: e.target.email.value,
        password: e.target.password.value,
        roleId: 2,
        createTeacherDto: {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value
    }
       }
       
       axios.post('https://schedule-service-alatoo.herokuapp.com/users/teacher', data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      }).then(res => {
        setRedirectToList(true)
      })
    }
    if(redirectToList){
        return <Redirect to="/teacher"/>
    }

         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h4" color="primary" align="center" component="h2">
                Registration teacher
                </Typography>
                    <form onSubmit={handleSubmit}>
        <FormControl fullWidth >
         <div style={{ width: 550 }}>
       
          <TextField 
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          placeholder="Name"
          fullWidth
          name="firstname"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
          <TextField
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          placeholder="Second Name"
          fullWidth
          name="lastname"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      
          <TextField
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14, color: '#000' }}
          placeholder="Email"
          fullWidth
         name="email"
        />

          <TextField
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          placeholder="Password"
          fullWidth
          name="password"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      </FormControl>
      <Button type="submit"  fullWidth variant="contained" color="primary" >Registration</Button>
                    </form>
                </div>
             </div>
        )
    }
