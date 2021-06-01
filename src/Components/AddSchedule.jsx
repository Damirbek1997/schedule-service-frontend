import React, { useEffect,useState }  from 'react';
import { Button ,FormControl,Select,MenuItem,InputLabel,  NativeSelect, makeStyles,Typography, TextField} from '@material-ui/core';
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
    const [state, setState] = useState([[]]);
    const [cabinets, setCabinets] = useState([]);
    const [subject,  setSubjet] = useState([]);
    const [subjectTime, setSubjectTime] = useState([]);
    const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const [group, setGroup] = useState([])
  const [openSubjectTime, setOpenSubjectTime] = useState(false)
  
  useEffect(() => {

    axios.get('https://schedule-service-alatoo.herokuapp.com/subjects')
        .then(res => {
            setSubjet(res.data)
        }) 

        axios.get('https://schedule-service-alatoo.herokuapp.com/subject_times')
        .then(res => {
            setSubjectTime(res.data)
        })  
        axios.get('https://schedule-service-alatoo.herokuapp.com/groups')
            .then(res => {
                setGroup(res.data)
            })  


        
  }, [])
    const classes = useStyles();

  const handleOpenTime = () =>{
    setOpenSubjectTime(true) 
  }
  const handleCloseTime = () =>{
    setOpenSubjectTime(false)
  }
  const onClickTime = (id) => {
    axios.get(`https://schedule-service-alatoo.herokuapp.com/cabinets/getAllBySubjectTimeId/${id}`)
            .then(res => {
              setCabinets(res.data)
            })
  }
    const handleChange = (event) => {
      const name = event.target.value;
      setState(name);
    };
  
   const handleSubmit = e => {
        e.preventDefault()
        const data = {
            cabinetId: e.target.cabinet.value,
            groupId:  e.target.group.value,
            semester : true,
            subjectId: e.target.subject.value,
            weekDay: e.target.days.value,
        }    
       axios.post(`https://schedule-service-alatoo.herokuapp.com/schedules`, data, {
            headers: {   
                "Access-Control-Allow-Origin": "*",
                 "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"            
              }})  
                .then(res => {
                  history.push('/schedule')
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
            

        <FormControl classes={{ root: classes.selectRole }} fullWidth >
        <NativeSelect 
          value={state.name}
          onChange={handleChange}
          name="group"
          className={classes.selectEmpty}
        >
        {  
          group.map(({id, groupName}) => {
           return <option  key={`vdvfvfrbdf_${id}`}    value={id}>{groupName}</option>
          })
        }          
        </NativeSelect>        
    </FormControl>

  

    <FormControl classes={{ root: classes.selectRole }} fullWidth >
        <NativeSelect 
          value={state.name}
          onChange={handleChange}
          name="subject"
          className={classes.selectEmpty}
        >
        {  
          subject.map(({id, subject}) => {
           return <option  key={`verver_${id}`}    value={id}>{subject}</option>
          })
        }          
        </NativeSelect>      
    </FormControl>
    <FormControl classes={{ root: classes.selectRole }} fullWidth >
      
        <NativeSelect 
          value={state.name}
          onChange={handleChange}
          name="days"
          className={classes.selectEmpty}
        >
        {  
          days.map((item) => {
           return <option  key={item}    value={item}>{item}</option>
          })
        }          
        </NativeSelect>      
    </FormControl>  
    <FormControl classes={{ root: classes.selectRole }} fullWidth >  
    <InputLabel id="demo-mutiple-time-label">Time</InputLabel>
    
        <Select
         labelId="demo-mutiple-name-label"
         id="demo-mutiple-name"
          open={openSubjectTime}
          onClose={handleCloseTime}
          onOpen={handleOpenTime} >         
         { 
            subjectTime.map(({id, time}) => {
            return <MenuItem  key={id} onClick = { () => onClickTime(id)} value={id}>{time}</MenuItem>
            })
         } 
        </Select>
    </FormControl>

     
    <FormControl classes={{ root: classes.selectRole }} fullWidth>
    <InputLabel id="demo-mutiple-name-label">Cabinet</InputLabel>

        <NativeSelect 
        labelId="demo-mutiple-name-label"
          value={state.name}
          onChange={handleChange}
          name="cabinet"
          className={classes.selectEmpty}
        >
        {  
          cabinets.map(({id, cabinet}) => {
           return(
            <>
            <option  key={`vdrbdf_${id}`}    value={id}>{cabinet}</option>
            </>
           )
          })
        }          
        </NativeSelect>
    </FormControl>   
      </div>
      </FormControl>
      <Button type="submit" fullWidth variant="contained" color="primary" >Add chedule </Button>
                    </form>
                </div>
             </div>
        )
    }
export default withRouter(AddSubject)