import React from 'react';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import AddTeacher from '../Components/Teacher';
import Student from '../page/student';
import AddStudent from '../Components/student';
import Subject from './subject';
import AddSubject from '../Components/Subject';
import AddSchedule from '../Components/AddSchedule';
import EditSubject from '../Components/editSubject';
import EditTeacher from '../Components/editTeacher';
import Group from './group';
import AddGroup from '../Components/Group';
import SelectSchedule from '../Components/selectSchedule';
import EditStudent from '../Components/editStudent'; 
import { Route, Switch } from 'react-router-dom';
import Teacher from './teacher';
const Home = () => {
    return (
        <div>
            <img src="./иа.jpg" className="home-bg" alt="Bg"/>
            <div className="wrapper">
      
              <Header />
              <div className="wrappOfMain">
              <main className="main-block">
                  <div className="admin-menu">
                    <Menu/>
                  </div>
                  <div className="info">
                    <Switch>
                        <Route  path="/teacher" component={Teacher}/> 
                        <Route  path="/editTeacher" component={EditTeacher}/> 
                        <Route  path="/addTeacher" component={AddTeacher}/> 
                        <Route  path="/student"  component={Student}/>  
                        <Route  path="/addStudent" component={AddStudent}/> 
                        <Route  path="/subject" component={Subject}/> 
                        <Route  path="/addSubject" component={AddSubject}/> 
                        <Route  path="/addGroup" component={AddGroup}/> 
                        <Route  path="/group" component={Group}/> 
                        <Route  path="/schedule" component={SelectSchedule}/> 
                        <Route  path="/editStudent" component={EditStudent}/> 
                        <Route  path="/editSubject" component={EditSubject}/> 
                        <Route  path="/addSchedule" component={AddSchedule}/> 
                        
                    </Switch>
                  </div>
              </main>
              </div>
              
            </div>
        </div>
    )
}

export default Home