import React from 'react';
import GetDepartment from '../Components/getDepatrment'
import axios from 'axios'
import { Link } from  'react-router-dom'
import DeleteEditBtn from '../Components/deleteEditBtn'
const Student = () => {
  const [subjects, setSubjects] = React.useState([])    

   const getGroups = (value) => {}
  const departmentId = (id) => {
    axios.get(`https://schedule-service-alatoo.herokuapp.com/subjects/getByDepartmentId/${id}`, {
      headers: {   
          "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"           
        }})
      .then( res => {       
            setSubjects(res.data)
        })
        .catch(err => {
            console.log(err)
        })
  }   
  
  const deleteSubjectById = (id) => {
    let subjectList = subjects.map(item => {
      return Object.assign({}, item)
    });      
    subjectList.splice(id, 1)
    setSubjects(subjectList)
  }

    return(
        <div className="wrap"> 
        <div className="select_group">
            <GetDepartment departmentId={departmentId} getSchadule={getGroups} />
            <Link  style={{ textDecoration: 'none' }} to="addSubject">
             <button className="add_btn"> Add new subject</button>
            </Link> 
      </div>
      
         <h2 style={{textAlign: 'center', margin: '0, 0 5px 0'}}>List of subjects </h2>
      <div class="scrollbar subject_list" id="style-2">
      <div class="force-overflow">
          <div className="list_head">
              <b>Name</b>
              <div>
                   <b>Edit </b>
                   <b>Delete </b>   
              
              </div>
          </div>
          {
              subjects.map((item,index) => {
                  return (
                    <div key={`${index}_listofstudents`} className="user-list-item"> 
                    <span> {item.subject} </span>
                     <DeleteEditBtn callbackRemove={() => deleteSubjectById(index) } remove={item.id} userRole="subject" to="subjectEdit"/>
                </div>
                  )
              })
          }
      </div>
    </div>
            </div>
    )
}

export default Student