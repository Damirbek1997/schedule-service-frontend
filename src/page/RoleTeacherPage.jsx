import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import { withRouter } from 'react-router-dom'

const RoleStudentPage = ({history}) => {
    const [user, setUser] = useState([] )
    const [schedule, setSchedule] = useState([])
    const [showEditBtn, setShowEditBtn] = useState(false)
    const [showBtns, setShowBtns] = useState(false)

    const edit = () => {
      setShowBtns(!showBtns)
      setShowEditBtn(!showEditBtn)
    }


    useEffect(()=>{
        axios.get('https://schedule-service-alatoo.herokuapp.com/users/profile' , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })  
        .then(res => {
            setUser(res.data)
                axios.get(`https://schedule-service-alatoo.herokuapp.com/schedules/getByTeacherId/${res.data.teacherId}` , {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            }) 
                .then(res => {
                    setSchedule(res.data)
                })
        })         
}, [])
const editTime = (id, day) => {
  axios.get(`https://schedule-service-alatoo.herokuapp.com/schedules/getByWeekDayAndScheduleTimeId`, 
  {params: {
    scheduleTimeId: id,
    weekDay: day
  }}) 
  .then(res => {
    history.push({
      pathname: '/editScheduleT',
      state: { id: res.data.id }
    })    
    console.log(res)
  })  
}

let days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  let time = ['09:00 am - 09:45 am', '09:45 am - 10:30 am','10:40 am - 11:25 am','11:25 am - 12:10 pm', '01:30 pm - 02:15 pm', '02:15 pm - 03:00 pm', '03:10 pm - 03:55 pm','03:55 pm - 04:30 pm']
  let scheduleByTime = {};
  
  schedule.forEach((item) => {
    if (!scheduleByTime[item.time]) {
      scheduleByTime[item.time] = {};
    }
    scheduleByTime[item.time][item.weekDay] = item;
  })
  
  
  let scheduleTable = time.map((nameTime, timeIndex) => {
    let weekByTime = days.map((nameDay,index) => {

      return (
        <td className="schedule_item" key={index + '_scheduleTable_child'}>
          { (() => {
            if(scheduleByTime[nameTime] &&  scheduleByTime[nameTime][nameDay]){
                return (
                  <>
                    <span style={{fontSize: "15px"}}>{scheduleByTime[nameTime][nameDay].cabinet }</span><br/>
                    <span style={{fontSize: "15px", color: "red"}} >{scheduleByTime[nameTime][nameDay].group }</span><br/>
                    <span style={{fontSize: "15px"}}>{scheduleByTime[nameTime][nameDay].subject }</span>
                    { showEditBtn && <button onClick={() => editTime(timeIndex+1,nameDay)} className="editTimeBtn">Edit time</button> }
                    
                  </>
                )
            }else{      
                return ' '
            }
          })() 
          }
        </td>
    ) 
    })
  
    return (
      <tr key={timeIndex + '_scheduleTable'}>
        <td style={{backgroundColor:'rgb(24,158,221)', color: 'white'}} key={timeIndex + '_scheduleTable_title'}>
          {nameTime}
        </td>
        {weekByTime}
      </tr>
    )
  })
 
return (
      <div>
         <Header firstname={user.firstname} lastname={user.lastname}/>
         { showBtns ?  
         <button onClick={edit} className="header_log_out log_out editBtn">Cancle</button>
             :
          <button onClick={edit} className="header_log_out log_out editBtn">Edit schedule</button>
           
         }
          
         <div>
        <table className="content-table">
          <tbody> 
          {
            <tr>
              <td>Time/Days</td>
              {
                days.map(day => {
                  return <td className="schedule-teble_header" key={`${day}_dfhdrf`}>{day}</td>
                })
              }
            </tr>
          }        
         {scheduleTable}
         </tbody>
      </table>
    </div>
      </div>
    )
}

export default withRouter(RoleStudentPage)