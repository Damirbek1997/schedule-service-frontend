import React, {useEffect, useState}  from 'react';
import { FormControl,  makeStyles,Typography, TextField} from '@material-ui/core';
import '../index.css'
import GetGroup from '../Components/getGroup'
import {Button,  Select,  MenuItem, InputLabel} from '@material-ui/core';
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
  

export default function  EditStudent (props)  {
    const classes = useStyles();
    const [openGroup, setOpenGroup] = React.useState(false);
    const [group, setGroup] = React.useState('');
    const [groupList, setGroupList] = React.useState([])
    const [student, setStudents] = React.useState([])
    const [redicrectToList, setRedicrectToList] = useState(false)
    
    const handleChangeGroup = (e) => {     
      setGroup(e.target.value)
    }

    useEffect( () => {
      axios.get(`https://schedule-service-alatoo.herokuapp.com/students/${props.location.state.id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('userToken')}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        }).then(res => {
          console.log(res.data)
          setStudents(res.data)
        })
  },[])
    const handleCloseGroup = () => {
      setOpenGroup(false);
    };

    const handleOpenGroup = () => {
      setOpenGroup(true);
    };

    const getGroups = (value) => {
      setGroupList(value)
     }

    const handleSubmit = e => {
       e.preventDefault()
       const data = {
            email: student.userDto.email,                   
            roleId: 3,
            updateStudentDto: {
              firstname: e.target.firstname.value || student.firstname,
              groupId: group || student.groupId,
              lastname: e.target.lastname.value || student.lastname,
              studentId: student.id                     
           },
           userId: student.userDto.id
        } 
      axios.put(`https://schedule-service-alatoo.herokuapp.com/users/student/${student.userDto.id}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      }).then(res => {
        console.log(res.data)
        setRedicrectToList(true)
      })
    }
    if(redicrectToList){
      return <Redirect to="/student" />
  }
         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h3" color="primary" align="center" component="h2">
                Edit student
                </Typography>
                    <form onSubmit={handleSubmit}>
        <FormControl fullWidth >
         <div style={{ width: 550 }}>
       
          <TextField 
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          placeholder={student.firstname}
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
          placeholder={student.lastname }
          fullWidth
          name="lastname"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

      </div>
      </FormControl>
      <GetGroup  getSchadule={getGroups} />  
      <FormControl className={classes.formControl}>
        <InputLabel id="department-label">{group}</InputLabel>
        <Select
          labelId="department-label"
          id="demo-controlled-open-select"
          open={openGroup}
          onClose={handleCloseGroup}
          onOpen={handleOpenGroup}
          value={group}
          onChange={handleChangeGroup}
        >
          { groupList.map(({id, groupName}) => {
           return <MenuItem key={id} value={id}>{groupName}</MenuItem>
          })
         }
        </Select>
      </FormControl>
      <Button type="submit"  fullWidth variant="contained" color="primary" >Edit</Button>
                    </form>
                </div>
             </div>
        )
    }
