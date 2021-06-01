import React , { useEffect,useState } from 'react';
import { Button ,FormControl,  makeStyles,Typography, TextField} from '@material-ui/core';
import '../index.css'
import {  Redirect } from 'react-router-dom'

import axios from 'axios'

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
  

export default function  EditTeacher (props)  {
    const classes = useStyles(); 
    const [user, setUser] = useState('')
    const [redicrectToList, setRedicrectToList] = useState(false)
    useEffect( () => {
        axios.get(`https://schedule-service-alatoo.herokuapp.com/teachers/${props.location.state.id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
          }).then(res => {
            setUser(res.data)
          })
    },[])
   const handleSubmit = e => {
       e.preventDefault()
      const data = {
      email: user.userDto.email,              
      roleId: 2,
      updateTeacherDto: {
      firstname: e.target.firstname.value || user.firstname,
      lastname: e.target.lastname.value || user.lastname  ,
      teacherId:  user.id         
     },
     userId: user.userDto.id
  } 

       axios.put(`https://schedule-service-alatoo.herokuapp.com/users/teacher/${user.userDto.id}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      }).then(res => {
        setRedicrectToList(true)
      })
    }
        if(redicrectToList){
            return <Redirect to="/teacher" />
        }

         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h4" color="primary" align="center" component="h2">
               Edit teacher
                </Typography>
                    <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
         <div style={{ width: 550 }}>
       
          <TextField 
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          fullWidth
          name="firstname"
          placeholder={user.firstname}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
          <TextField
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          fullWidth
          name="lastname"
          margin="normal"
          placeholder={user.lastname}

        /> 
      
      </div>
      </FormControl>
      <Button type="submit"  fullWidth variant="contained" color="primary" >Edit</Button>
                    </form>
                </div>
             </div>
        )
    }
