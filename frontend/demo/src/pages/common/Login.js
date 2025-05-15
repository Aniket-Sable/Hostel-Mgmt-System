import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router';
import Dashboard from "../student/Dashboard";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import NavHome from "../student/NavHome";
import Otp from './Otp'
axios.defaults.withCredentials = true;

function Login() {

  function sendotp() {
    document.location.href = '/forget'

  }
  <Route path='/Dashboard/home' component={NavHome} />


  const url_student = "http://localhost:3001/api/users/userlogin";
  const url_manager = "http://localhost:3001/api/manager/login";
  const url_admin = "http://localhost:3001/api/admin/login";

  const [data, setData] = useState({
    email: "",
    password: "",
    user: ""
  });

  const submit = (e) => {

    e.preventDefault();
    let user = data.user;

    if (user === 'student') {


      axios.post(url_student, {

        withCredentials: true,
        email: data.email,
        password: data.password,
        user: data.user

      })
        .then(res => {
          console.log(res);
          console.log(res.status);

          if (res.status === 200) {
            document.location.href = '/Dashboard/home'
          }
          else if(res.status === 260) {
            window.alert("Invalid Credentials");
          }
          else if(res.status === 271) {
            window.alert("You are not Eligible for Next Process");
          }
          

        })
        .catch(error => {
          console.log(error);
          window.alert("Invalid Credentials")
        })

    }
    if (user === 'manager') {


      axios.post(url_manager, {

        withCredentials: true,
        email: data.email,
        password: data.password,
        user: data.user

      })
        .then(res => {
          console.log(res);
          console.log(res.status);

          if (res.status === 200) {
            document.location.href = '/Dash/home'
          }else if(res.status == 231){
            window.alert("Invalid Credentials");
          }
          else {
            window.alert("no")
          }

        })
        .catch(error => {
          console.log(error);
          window.alert("Invalid Credentials")
        })

    } 
    if (user === 'admin') {


      axios.post(url_admin , {

        withCredentials: true,
        email: data.email,
        password: data.password,
        user: data.user

      })
        .then(res => {
          console.log(res);
          console.log(res.status);

          if (res.status === 200) {
            document.location.href = '/adash/home'
          }
          else {
            window.alert("no")
          }

        })
        .catch(error => {
          console.log(error);
          window.alert("Invalid Credentials")
        })

    } else if (user === '') {
      window.alert("Please Select the user type");
    } 

  }

  function handle(e) {

    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);

  }


  return (
    <>      <div className="formCenter">
      <form className="formFields" onSubmit={(e) => submit(e)}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            required
            onChange={(e) => handle(e)}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={data.pass}
            required
            onChange={(e) => handle(e)}
          />
        </div>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="user">
            Login As<br />
            <select
              className="drop"
              onChange={(e) => handle(e)}
              id="user"
              name="password"

            >
              <option select value="Select">Select</option>
              <option value="student">Student</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>

            </select>
          </label>
        </div>

        <div className="formField">
          <button className="formFieldButton" type="submit">Sign In</button>{" "}
          {/* <Link to="/" className="formFieldLink">
              Create an account
            </Link> */}
          <Link onClick={sendotp} className="formFieldLink">
            Forget Password
          </Link>
        </div>


      </form>
    </div>

    </>

  );
}


export default Login;
