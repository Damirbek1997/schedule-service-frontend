import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
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
  root: {
    marginTop: '0px',
    maxWidth: 900,
    border: 'none',
  },
    button: {
      display: 'block', 
      marginTop: theme.spacing(2),
    },
    alignRight: {
      textAlign: 'left'
    },
    table: {
      maxWidth: 900,
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

 const Teachers = () => {
  const classes = useStyles();

     const [teachers, setTeachers] = React.useState([])

    useEffect( () => {
        axios.get(`https://schedule-service-alatoo.herokuapp.com/teachers`, {
            headers: {   
                "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"            
              }})
        .then( res => {
            setTeachers(res.data)  
          })
          .catch(err => {
              console.log(err)
          })
    },[])

    const deleteTeacherById = (id) => {
      let teacherList = teachers.map(item => {
        return Object.assign({}, item)
      });      
      teacherList.splice(id, 1)
      setTeachers(teacherList)
    }
  
  return (
    <div>
      <div className="info_head_teacher">       
          <div></div>
          <div></div>
          <h2 className="teacher_title">List of teacher</h2>
          <Link style={{ textDecoration: 'none' }} to="addTeacher">
              <button className="add_btn"> Add new teacher</button>
          </Link>   
       </div>    
         <div style={{padding: 0}} className="scrollbar student_list" id="style-2">
       <div className="force-overflow">
        <TableContainer className={classes.root}  component={Paper}>
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
                teachers.map((teacher,index) => (                  
                    <TableRow key={teacher.id}>
                      <TableCell className={classes.root} component="th" align="left"  scope="row">
                        {teacher.firstname} {teacher.lastname}
                      </TableCell> 
                    <TableCell className={classes.root} className={classes.alignLeft} align="right">{teacher.userDto.email}</TableCell>
                    <div className={classes.btnsFlex} >                        
                        <DeleteEditBtn remove={teacher.id} to="teacherEdit"  callbackRemove={() =>deleteTeacherById(index)} userRole={2}/>
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
  );    
}
export default Teachers