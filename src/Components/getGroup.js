import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
 
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SelectSchedule(props) {
  const classes = useStyles();
  const [openFaculty, setOpenFaculty] = React.useState(false);
  const [openDepartment, setOpenDepartment] = React.useState(false);
  const [faculties, setFaculties] = React.useState([])
  const [departmentList, setDepartmentList] = React.useState([])
  const [groupList, setGroupList] = React.useState([])
   useEffect(() => {
    axios.get('https://schedule-service-alatoo.herokuapp.com/faculties')
    .then( res => {
      setFaculties(res.data)
      })     
    },[])
  

  const handleCloseFaculty = () => {
    setOpenFaculty(false);
  };

  const handleOpenFaculty = () => {
    setOpenFaculty(true);
  };
  
  const handleCloseDepartment = () => {
   
    setOpenDepartment(false);
  };

  const handleOpenDepartment = () => {
    setOpenDepartment(true);
  };

  const onClickFaculty = (id) => {
    axios.get(`https://schedule-service-alatoo.herokuapp.com/departments/getAllByFacultyId/${id}`)
      .then( res => {
        
        setDepartmentList(res.data)
        props.getSchadule(res.data)  
        }) 
  }
  const onClickDeparmtent = (id) => {
    axios.get(`https://schedule-service-alatoo.herokuapp.com/groups/getAllByDepartmentId/${id}`,)
      .then( res => {
        setGroupList(res.data) 
        props.getSchadule(res.data)      
        }) 
  }

  return (
    <div>
      <FormControl  className={classes.formControl}>
        <InputLabel id="faculty-label">Faculty</InputLabel>
        <Select
          labelId="faculty-label"
          id="demo-controlled-open-select"
          open={openFaculty}
          onClose={handleCloseFaculty}
          onOpen={handleOpenFaculty} >
         { 
            faculties.map(({id, faculty}) => {
            return <MenuItem  key={id} onClick = { () => onClickFaculty(id)} value={faculty}>{faculty}</MenuItem>
            })
         }         
        </Select>
      </FormControl>
 
     <FormControl className={classes.formControl}>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          id="demo-controlled-open-select"
          open={openDepartment}
          onClose={handleCloseDepartment}
          onOpen={handleOpenDepartment} >         
         { 
            departmentList.map(({id, department}) => {
            return <MenuItem  key={id} onClick = { () => onClickDeparmtent(id)} departmentId={id} value={department}>{department}</MenuItem>
            })
         }
        </Select>
      </FormControl>
    </div>
  );
}