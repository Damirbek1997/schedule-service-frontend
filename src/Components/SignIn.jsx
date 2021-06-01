import React, { useState }  from 'react';
import { Button ,FormControl, makeStyles,Typography, TextField} from '@material-ui/core';
import '../index.css'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

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

 function SignIn ({history}) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectToPageByRole = (role) => {
        switch(role){
            case 'ROLE_ADMIN':
                history.push('/adminhome') 
                break
            case 'ROLE_STUDENT':
                history.push('/studentpage')
                break
            case 'ROLE_TEACHER':
                history.push('/teacherpage')
                break
        }
    }

    const handleSubmit = e => {
        e.preventDefault()        
       axios.post('https://schedule-service-alatoo.herokuapp.com/login', {email, password}, {
        headers: {"Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }})
        .then(res => {      
                localStorage.setItem('userToken', res.data.jwt)                
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
                axios.get('https://schedule-service-alatoo.herokuapp.com/users/profile' , {
                                    headers: {
                                        'Authorization': `Bearer ${res.data.jwt}`
                                    }
                                })
                        .then(res => {
                            setPassword('')
                            setEmail('') 
                            redirectToPageByRole(res.data.role)
                        })           
                    })
            .catch(err => {
                console.log(err)
            })
        }
      return (
            <div className="auth_wrapper">
                    <div className="login_inner">
                        <Typography variant="h3" color="primary" align="center" component="h3">
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
                                    type="password"
                                    hinttext="Password"
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

    export default withRouter(SignIn);
