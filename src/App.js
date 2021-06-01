import React from 'react';
import SignIn from './Components/SignIn' ;
import RoleStudentPage from './page/RoleStudentPage'
import RoleTeacherPage from './page/RoleTeacherPage'
import EditScheduleInTeacherPage from './page/EditScheduleInTeacherPage';
import MainRoutes from '../src/main'
import { Route, Switch } from 'react-router-dom'
const  App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route  path="/studentpage" component={RoleStudentPage} />
        <Route  path="/teacherpage" component={RoleTeacherPage} />      
        <Route  path="/editScheduleT" component={EditScheduleInTeacherPage} />      
        <Route component={MainRoutes} />
        
        </Switch>
    </div>
  );
}

export default App;
