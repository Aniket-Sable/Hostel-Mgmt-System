import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Rector from "./pages/manager/Rector";
import Student from "./pages/common/Login_page";
import Home from './pages/common/Home';
import Dashboards from './pages/student/Dashboards';
import RectorDash from './pages/manager/RectorDash';
import Otp from './pages/common/Otp';
import ResetPassword from './pages/common/ResetPassword';
import { useHistory} from "react-router-dom";
import Cdash from './pages/common/Cdash';
import { Redirect } from 'react-router-dom';
import Temp from './pages/common/Temp';
import Adash from './pages/admin/Dashboard';
import {BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';






function App() {


  
  return (
      <>
    <Router>    
      <div className="App">
   
        <Switch>
          <Route path="/" exact component={Temp}/>
          <Route path="/cdash"   component={Cdash}/>
          <Route path="/adash"   component={Adash}/>
          <Route path="/student"  component={Student}></Route>
          <Route path="/rector"  component={Rector}></Route>
          <Route path="/Dashboard" component={Dashboards} />
          <Route path="/Dash" component={RectorDash} />
          <Route path="/reset" component={ResetPassword} />
      <Route exact path="/forget" component={Otp} />


        </Switch>
      </div>
    
    </Router>

    </>
  );
}

export default App;
