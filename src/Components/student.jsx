import React  from 'react';
import { Button ,FormControl, Select, MenuItem, InputLabel,   makeStyles,Typography, TextField} from '@material-ui/core';
import GetGroup from './getGroup'
import '../index.css'
import axios from 'axios'
import {  Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

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

function  Student ({history})  {
    const classes = useStyles();
    const [openGroup, setOpenGroup] = React.useState(false);
    const [group, setGroup] = React.useState('');
    const [groupList, setGroupList] = React.useState([])
    
   const handleSubmit = e => {
        e.preventDefault()
       const data = {
        email: e.target.email.value,
        password: e.target.password.value,
        roleId: 3,        
        createStudentDto: {
        firstname: e.target.firstname.value,
        groupId:group,
        lastname: e.target.lastname.value
    }
       }
       e.preventDefault()
       axios.post('https://schedule-service-alatoo.herokuapp.com/users/student', data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          }
      }).then(res => {
        history.push('/student')
      })
    }

    const handleChangeGroup = (e) => {
      setGroup(e.target.value)
    }
  
    const handleCloseGroup = () => {
      setOpenGroup(false);
    };
    const sayHello = (value) => {
      setGroupList(value)
    }
    const handleOpenGroup = () => {
      setOpenGroup(true);
    };

  
         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h5" color="primary" align="center" component="h5">
                Add new student
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

 <GetGroup  getSchadule={sayHello} />  
      <FormControl className={classes.formControl}>
        <InputLabel id="department-label">Group</InputLabel>
        <Select
          labelId="department-label"
          id="demo-controlled-open-select"
          open={openGroup}
          onClose={handleCloseGroup}
          onOpen={handleOpenGroup}
          value={group}
          onChange={handleChangeGroup}
        >
          {  groupList.map(({id, groupName}) => {
           return <MenuItem key={id} value={id}>{groupName}</MenuItem>
          })
         }
        </Select>
      </FormControl>
      </div>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" color="primary" >Registration</Button>
                    </form>
                </div>
             </div> 
        )
    }

    export default withRouter(Student)