import React , { useEffect,useState } from 'react';
import { Button ,FormControl,  makeStyles,Typography, TextField} from '@material-ui/core';
import '../index.css'
import { withRouter } from 'react-router-dom'

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
  

function  EditSubject (props)  {
    const classes = useStyles(); 
    const [subject, setSubject] = useState('')
    const [redicrectToList, setRedicrectToList] = useState(false)
    useEffect( () => {
        axios.get(`https://schedule-service-alatoo.herokuapp.com/subjects/${props.location.state.id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              }
          }).then(res => {
              setSubject(res.data)
          })
    },[])
   const handleSubmit = e => {
       e.preventDefault()
       const data = {       
        departmentId:  subject.departmentDto.id,
        id: subject.id,
        subject: e.target.subject.value || subject.subject,
        teacherId: subject.teacherDto.id 
        }              
    

       axios.put(`https://schedule-service-alatoo.herokuapp.com/subjects/${props.location.state.id}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      }).then(res => {
        props.history.push('/subject')
      })
    }    
         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h4" color="primary" align="center" component="h2">
               Edit subject
                </Typography>
                    <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
         <div style={{ width: 550 }}>
       
          <TextField 
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          fullWidth
          name="subject"
          placeholder={ subject.subject}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
     
      
      </div>
      </FormControl>
      <Button type="submit"  fullWidth variant="contained" color="primary" >Edit</Button>
                    </form>
                </div>
             </div>
        )
    }

    export default withRouter(EditSubject)