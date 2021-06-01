import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, InputLabel} from '@material-ui/core';
import axios from 'axios'
import { Link } from  'react-router-dom'

import GetGroup from './getGroup'
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

export default function SelectSchedule() {
  const classes = useStyles();
 const [openGroup, setOpenGroup] = useState(false);
  const [group, setGroup] = useState('');
   const [groupList, setGroupList] = useState([])
   const [schedule, setSchedule] = useState([])
   const [showDays, setShowDays] = useState(false)

   
   const handleChangeGroup = (e) => {
    setGroup(e.target.value) 
  }


  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const handleOpenGroup = () => {
    setOpenGroup(true);
  };
  const sayHello = (value) => {
    setGroupList(value)
  }
  const onClickGroup = (id) => {
     axios.get(`https://schedule-service-alatoo.herokuapp.com/schedules/getAllByGroupId/${id}`,)
    .then( res => {
      setSchedule(res.data)
      })
  } 

  let days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  let time = ['09:00 am - 09:45 am', '09:45 am - 10:30 am','10:40 am - 11:25 am','11:25 am - 12:10 pm', '01:30 pm - 02:15 pm', '02:15 pm - 03:00 pm', '03:10 pm - 03:55 pm','03:55 pm - 04:30 pm']
  let scheduleByTime = {};
  let itemContent;
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
        <td  style={{backgroundColor:'rgb(24,158,221)', color: 'white'}}  key={index + '_scheduleTable_title'}>
          {nameTime}
        </td>
        {weekByTime}
      </tr>
    )
  })
 
  return (
    <div>
    <div className="select_group">
      <GetGroup getSchadule={sayHello} />  
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
           return <MenuItem  key={`dger_${id}`}  onClick = { () => onClickGroup(id)}  value={id}>{groupName}</MenuItem>
          })
         }
        </Select>
     
      </FormControl>
      <Link  style={{ textDecoration: 'none' }} to="addSchedule">
             <button className="add_btn"> Add new schedule</button>
            </Link>             
      </div>
      <div className="scroll">        
        <table className="scroll content-table">
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
  );
}