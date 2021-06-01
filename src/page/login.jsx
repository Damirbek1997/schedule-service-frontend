import React, { useState }  from 'react';
import { Button ,FormControl, makeStyles,Typography, TextField} from '@material-ui/core';
import '../index.css'
import {  Redirect } from 'react-router-dom'
import axios from 'axios'
import SignIn from '../Components/SignIn' 







const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    customTextField: {
        fontSize: "16px",
        fontWeight: 800,
        color: '#000',
        "& input::placeholder": {
            textOverflow: 'black !important',
            color: '#000',
            fontWeight: 800,
        }
      },
      
  }));
  

export default function  SignIn ()  {

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


   const handleSubmit = e => {
        e.preventDefault()
    const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      }
       axios.post('https://schedule-service-alatoo.herokuapp.com/login', {email, password}, config)
       .then(res => {
            localStorage.setItem('userToken', res.data.jwt)
            setPassword('')
            setEmail('')
            setRedirect(true)
       })
       .catch(error => {
        console.log(error);
       })
       
    }
    if (redirect) {
        return <Redirect to="/adminhome"/>;
    }
      return (
            <div className="auth_wrapper">
                    <div className="login_inner">
                        <Typography variant="h3" color="primary" align="center" component="h2">
                            Login Account
                        </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth >
                            <div style={{ width: 450 }}>
                                <TextField
                                    classes={{ root: classes.customTextField }}
                                    id="standard-full-width"
                                    style={{ margin: 14, color: '#000' }}
                                    placeholder="Email"
                                    fullWidth
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email"
                                 />
                                <TextField
                                    classes={{ root: classes.customTextField }}
                                    id="standard-full-width"
                                    style={{ margin: 14 }}
                                    placeholder="Password"
                                    fullWidth
                                    value={password}
                                    onChange={e => setPassword(e.target.value) }  
                                    name="password"
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                }}
                                />                    
                            </div>
                        </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary" >Sign in</Button>
          </form>
                </div>
             </div>
        )
    }
