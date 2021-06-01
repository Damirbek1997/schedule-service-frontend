import React, { useEffect,useState }  from 'react';
import { Button ,FormControl,NativeSelect, makeStyles,Typography, TextField} from '@material-ui/core';
import '../index.css'
import axios from 'axios'
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
      selectEmpty: {
            margin:"8px 0 "
      },
      selectRole: {
          marginLeft: '15px',
          fontSize: "16px",
          fontWeight: 800,
          color: '#000',
      },
     
  }));
  

function  AddSubject ({history})  {
  const [state, setState] = useState('');
  
  const [departments, setDepartments] = useState([])
  const [teachers, setTeachers] = useState([])
  useEffect(() => {
    axios.get('https://schedule-service-alatoo.herokuapp.com/departments')
        .then(res => {
            setDepartments(res.data)
            axios.get('https://schedule-service-alatoo.herokuapp.com/teachers')
                  .then(res => {
                    setTeachers(res.data)
                  })
        })
  }, [])
    const classes = useStyles();

  
    const handleChange = (event) => {
      const name = event.target.value;
      setState(name);
    };

   const handleSubmit = e => {
        e.preventDefault()
       const data = {
          departmentId: e.target.department.value,
          subject:  e.target.nameOfSubject.value,
          teacherId : e.target.teacher.value
       }
       axios.post(`https://schedule-service-alatoo.herokuapp.com/subjects`, data, {
            headers: {   
                "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"            
              }})  
                .then(res => {
                  history.push('/subject')
                })   
    }

         return (
            <div className="auth_wrapper">
                <div className="auth_inner form-group">
                <Typography variant="h3" color="primary" align="center" component="h2">
                Add new  subject
                </Typography>
                    <form onSubmit={handleSubmit}>
        <FormControl fullWidth >
         <div style={{ width: 550 }}>
       
          <TextField 
          classes={{ root: classes.customTextField }}
          id="standard-full-width"
          style={{ margin: 14 }}
          placeholder="Name of subject"
          fullWidth
          name="nameOfSubject"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
    
    
<FormControl classes={{ root: classes.selectRole }} fullWidth >
        <NativeSelect 
          value={state.name}
          onChange={handleChange}
          name="teacher"
          className={classes.selectEmpty}
        >
            {  
              teachers.map(({id,firstname,lastname }) => {
              return <option  key={`idvdscsd_${id}`}    value={id}>{firstname} {lastname}</option>
              })  
            }
        </NativeSelect>      
</FormControl>
     

<FormControl classes={{ root: classes.selectRole }} fullWidth >
        <NativeSelect 
          value={state.name}
          onChange={handleChange}
          name="department"
          className={classes.selectEmpty}
        >
        {  
          departments.map(({id, department}) => {
           return <option  key={id}    value={id}>{department}</option>
          })
        }          
        </NativeSelect>
      
</FormControl>
                
      </div>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" color="primary" >Add  </Button>
                    </form>
                </div>
             </div>
        )
    }
export default withRouter(AddSubject)