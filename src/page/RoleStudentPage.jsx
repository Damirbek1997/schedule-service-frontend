import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header from '../Components/Header'
const RoleStudentPage = () => {
    const [schedule, setSchedule] = useState([])
    const [user, setUser] = useState([])
    useEffect(()=>{
        axios.get('https://schedule-service-alatoo.herokuapp.com/users/profile' , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })  
        .then(res => {
            setUser(res.data)
            axios.get(`https://schedule-service-alatoo.herokuapp.com/schedules/getAllByGroupId/${res.data.groupId}`,)
            .then( res => {
              setSchedule(res.data)
              })
        })         
}, [])
let days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  let time = ['09:00 am - 09:45 am', '09:45 am - 10:30 am','10:40 am - 11:25 am','11:25 am - 12:10 pm', '01:30 pm - 02:15 pm', '02:15 pm - 03:00 pm', '03:10 pm - 03:55 pm','03:55 pm - 04:30 pm']
  let scheduleByTime = {};
  
  schedule.forEach((item) => {
    if (!scheduleByTime[item.time]) {
      scheduleByTime[item.time] = {};
    }
    scheduleByTime[item.time][item.weekDay] = item;
  })
  
  
  let scheduleTable = time.map((nameTime, index) => {
    let weekByTime = days.map((nameDay,index) => {
      return (
        <td className="schedule_item" key={index + '_scheduleTable_child'}>
          { (() => {
            if(scheduleByTime[nameTime] &&  scheduleByTime[nameTime][nameDay]){
                return (
                  <>
                    <span style={{fontSize: "15px"}}>{scheduleByTime[nameTime][nameDay].cabinet }</span><br/>
                    <span style={{fontSize: "15px", color: "red"}} >{scheduleByTime[nameTime][nameDay].lastname } {scheduleByTime[nameTime][nameDay].firstname }</span><br/>
                    <span style={{fontSize: "15px"}}>{scheduleByTime[nameTime][nameDay].subject }</span>
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
    <tr key={index + '_scheduleTable'}>
      <td style={{backgroundColor:'rgb(24,158,221)', color: 'white'}} key={index + '_scheduleTable_title'}>
        {nameTime}
      </td>
      {weekByTime}
    </tr>
  )
})

    return (
        <div>
            <Header  firstname={user.lastname} lastname={user.firstname}/>
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
    )
}

export default RoleStudentPage