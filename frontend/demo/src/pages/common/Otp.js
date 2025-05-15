import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Otp() {

    const url = "http://localhost:3001/api/users/email-send";

    const [data,setData] = useState({ 
      email:""
    });
  
  const  submit = (e)=> {
  
      e.preventDefault(); 
  
      axios.post(url, {
  
      withCredentials: true,
      email : data.email,
       
      })
      .then(res => {
        console.log(res);
        console.log(res.status);
       
        if(res.status===200){
          toast.success("Login Successfully!",{
            position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          document.location.href = '/reset'
        }
        else{
          window.alert("no")
          toast.error("Failed to Login-In!");
        }
        
      })
      .catch(error => {
        console.log(error);
        // window.alert("Email Not Registered")
        toast.error("Email Not Registered!",{
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          // icon: "❗",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
  
      
  
    }
   
    function handle(e) {
  
      const newdata={...data};
      newdata[e.target.id]=e.target.value;
      setData(newdata);
      console.log(newdata);
  
    }
  
  
    return (
        <div className="appForm-forget">
        <form className="formFields" onSubmit={(e) => submit(e)}>
        <ToastContainer />
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
        <button className="formFieldButton" type="submit">Send otp</button>{" "}

        </form>
        </div>
    )
}
