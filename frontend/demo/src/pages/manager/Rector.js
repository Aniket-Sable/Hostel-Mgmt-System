import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import SignInForm from "./SignInForm";
import "../css/LoginPage.css";


// import "./Temp.css";
// class Temp extends Component

function Rector() {
 
    return (
      <>
      <Router>
         <div className="header">
         <h2 className="title">Hostel Allocation and Management System</h2>
         </div>
        <div className="Temp">
          
          <div className="rec-appAside">
           
          </div>
          <div className="appForm">
            <div className="pageSwitcher">
              <NavLink
                to="/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink to="/" activeClassName="formTitleLink-active" className="formTitleLink">
                Sign In
              </NavLink>{" "}
            </div>

            <Route exact path="/" component={SignInForm} />
         
          </div>
        </div>
        <div className="footer-rec"><h5 className="footer-text">A Portal for Hostel Room Allocation and Management | Copyright@2021</h5></div>
        
      </Router>
      </>
    );
}



export default Rector;
