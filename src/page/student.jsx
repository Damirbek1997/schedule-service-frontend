import React from 'react';
import GetGroup from '../Components/getGroup'
import { FormControl, makeStyles, Select, MenuItem, InputLabel} from '@material-ui/core';
import axios from 'axios'
import { Link } from  'react-router-dom'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteEditBtn from '../Components/deleteEditBtn';


const useStyles = makeStyles((theme) => ({ 
  root:{
    marginTop: '30px',
    border: 'none',
  },
    button: { 
      display: 'block', 
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    alignLeft: {
      textAlign:'left' ,
      border: 'none'
    },
    btnsFlex : {
      display: 'flex',
     justifyContent: 'flex-end'
    }
  }));
 const Student = () => {
    const classes = useStyles()
    const [openGroup, setOpenGroup] = React.useState(false);
    const [showList, setShowList] = React.useState(false);
    const [group, setGroup] = React.useState([]);
    const [groupList, setGroupList] = React.useState([])
    const [students, setStudents] = React.useState([])
    
    const handleChangeGroup = (e) => {
      setGroup(e.target.value)
    }
    let showListForms;

    const deleteStudentById = (id) => {
      let studentList = students.map(item => {
        return Object.assign({}, item)
      });      
      studentList.splice(id, 1)
      setStudents(studentList)
    }
    const handleCloseGroup = () => {
      setOpenGroup(false);
    };

    const handleOpenGroup = () => {
      setOpenGroup(true);
    };
    const onClickGroup = (id) => {
        axios.get(`https://schedule-service-alatoo.herokuapp.com/users/getAllByRoleId/3`, {
          headers: {   
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
              
            }})
      .then( res  => {
            axios.get(`https://schedule-service-alatoo.herokuapp.com/students/getAllByGroupId/${id}`)
              .then(result => {
                  setStudents(result.data)
                  setShowList(true)
              })        
        })
        .catch(err => {
            console.log(err)
        })
    } 
     const getGroups = (value) => {
        setGroupList(value)       
     }
     if(showList){
      showListForms = (       
          <div>
            <div className="info_head">       
                <h2 className="student_title">List of student</h2>
          </div>    
               <div style={{padding: 0}} className="scrollbar student_list" id="style-2">
             <div className="force-overflow">
              <TableContainer  component={Paper}>
                <Table aria-label="caption table">
                  <TableHead  className="tableHead">
                    <TableRow>
                      <TableCell className={classes.root} >Name</TableCell>
                      <TableCell className={classes.alignLeft}>Email</TableCell>
                      <TableCell  className={classes.root} align="right">Delete /  Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    { 
                      students.map((student,index) => (                  
                          <TableRow key={`stod_${student.id}`} >
                            <TableCell className={classes.root} component="th" align="left"  scope="row">
                              {student.firstname} {student.lastname}
                            </TableCell> 
                          <TableCell className={classes.root} className={classes.alignLeft} align="right">{student.userDto.email}</TableCell>
                          <div className={classes.btnsFlex} >  
                             <DeleteEditBtn userRole={3} remove={student.id}  callbackRemove={() =>deleteStudentById(index)}  to="studentEdit" />                      
                          </div>  
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
              </div>
              </div>
         
      )
    }
    return (
    <div>  
        <div>
            <div className="select_group">
                <GetGroup  getSchadule={getGroups} />
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
                    return <MenuItem  key={id}  onClick = { () => onClickGroup(id)}  value={id}>{groupName}</MenuItem>
                    })
                  }
                  </Select>
                </FormControl>
                <Link  style={{ textDecoration: 'none' }} to="addStudent">
                  <button className="add_btn"> Add new student</button>
                </Link>  
          </div>          
    </div>
  {showListForms}
</div>
)}
export default Student