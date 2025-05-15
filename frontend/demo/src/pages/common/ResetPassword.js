import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";



export default function ResetPassword() {

    const url = "http://localhost:3001/api/users/change-password";

    const [data,setData] = useState({ 
      otp:"",
      password:"",
      cpassword:""
    });
  
  const  submit = (e)=> {
  
      e.preventDefault(); 
  
      axios.post(url, {
  
      withCredentials: true,
      otp : data.otp,
      password : data.password,
      cpassword : data.cpassword,
       
      })
      .then(res => {
        console.log(res);
        console.log(res.status);
       
        if(res.status===200){
          document.location.href = '/student/sign-in'
        }
        else{
          window.alert("no")
        }
        
      })
      .catch(error => {
        console.log(error);
        window.alert("Invalid Otp");
         
  
      })
    }
   
    function handle(e) {
  
      const newdata={...data};
      newdata[e.target.id]=e.target.value;
      setData(newdata);
      console.log(newdata);
  
    }
  
  
    return (
      <>
      
        <div className="appForm">
        <form className="formFields" onSubmit={(e) => submit(e)}>
        <div className="formField">
            <label className="formFieldLabel" htmlFor="otp">
              Enter Otp Sent to Your Email
            </label>
            <input
              type="number"
              id="otp"
              className="formFieldInput"
              placeholder="Enter Otp"
              name="otp"
              value={data.otp}
              required
              onChange={(e) => handle(e)}
            />
         
        </div>
        <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="New Password"
              name="password"
              value={data.password}
              required
              onChange={(e) => handle(e)}
            />
         
        </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Confirm New Password
            </label>
            <input
              type="password"
              id="cpassword"
              className="formFieldInput"
              placeholder="New Password"
              name="cpassword"
              value={data.cpassword}
              required
              onChange={(e) => handle(e)}
            />
         
        </div>
        <button className="formFieldButton" type="submit">Change Password</button>{" "}

        </form>
        </div>
        </>
    )
}
