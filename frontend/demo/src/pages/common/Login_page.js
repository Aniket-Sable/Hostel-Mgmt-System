import React, { Component } from "react";
import { useState, useEffect} from 'react';

import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import StudentSignIn from "./Login";
import "../css/LoginPage.css";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from "@restart/ui/esm/Button";
import Dashboards from "../student/Dashboards";

import { useHistory, withRouter } from "react-router-dom";

// import "./Temp.css";
// class Temp extends Component

function Login_page() {
  

  let history=useHistory();

  useEffect(() => {

    history.push('/student/sign-in');    
}, []);
    return (
        <>
       
   
        <div className="Temp">
        <div className="header">
         <h2 className="title">Hostel Allocation and Management System</h2>
         </div>
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/student/sign-in"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              {/* <NavLink
                exact
                to="/student/sign-up"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink> */}
            </div>

            <div className="formTitle">
              <NavLink
                to="/student/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              {/* or{" "} */}
              {/* <NavLink
                exact
                to="/student/sign-up"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink> */}
            </div>

            {/* <Route exact path="/student/sign-up" component={StudentSignUp} /> */}
            <Route path="/student/sign-in" component={StudentSignIn} />
            {/* <Route path="/Dashboard" component={Dashboards} /> */}
           
          </div>
          <div className="footer"><h5 className="footer-text">A Portal for Hostel Room Allocation and Management | Copyright@2021</h5></div>
     
        </div>
       
        
      </>
    );
  
}
export default Login_page;
