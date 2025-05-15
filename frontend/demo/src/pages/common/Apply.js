import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";
import Footer from './Footer.js';

function Apply() {

  const url1 = "http://localhost:3001/api/users/apply";
  const url2 = "http://localhost:3001/api/users/uploadfile";

  const [selectedfile, setselectedfile] = useState(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    prn: "",
    contactno: "",
    caddress: "",
    paddress: "",
    year: "",
    branch: "",
    exam: "",
    score: "",
    category: "",
    bgroup: "",
    gender: "",
    handicap: "",
    allergy: "",
    dob: "",
  });



  function submit(e) {

    e.preventDefault();
    // const requestOne = axios.post(url1);
    // const requestTwo = axios.post(url1);
    const formData = new FormData();

    formData.append(
      "myFile",
      selectedfile,
      selectedfile.name
    );

    let array = {
      name: data.name,
      email: data.email,
      prn: data.prn,
      contactno: data.contactno,
      year: data.year,
      branch: data.branch,
      exam: data.exam,
      score: data.score,
      category: data.category,
      bgroup: data.bgroup,
      gender: data.gender,
      handicap: data.handicap,
      allergy: data.allergy,
      dob: data.dob,
      formData
    }

    // axios.all([requestOne, requestTwo], array, formData).then(axios.spread((...responses) => {
    //   const responseOne = responses[0]
    //   const responseTwo = responses[1]

    //   if (responseOne.status == 200) {
    //     window.alert("Application submitted successfully!!");
    //     // history.push('/')
    //   }

    // })).catch(error => {

    //   console.log(error);
    //   // if(error.status==400){
    //   //   window.alert("Enter Valid data!!");
    //   // }
    //   window.alert("Enter Valid data!!");

    // })

    axios.post(url1, array).then(res => {
    

      if (res.status == 200) {
        window.alert("Application submitted successfully!!");
        // history.push('/')
      }else{
        window.alert("no")
      }
    }).catch(error => {
      console.log(error);
      window.alert("Enter Valid data!!");

    })


  }
  function handle(e) {

    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);

  }

  function onFileSelect(e) {

    const file = e.target.files[0];
    console.log(file);
    setselectedfile(file);
  }


  return (
    <>
      <div className='reports'>
        <div className="apply-form">
          <h2 style={{ textAlign: 'center' }}>Application Form</h2>
          <form className="formFields" onSubmit={(e) => submit(e)}>
            <div className="formField">
              <label className="formFieldLabel applyform" htmlFor="email">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your Full Name"
                name="name"
                required
                value={data.name}
                onChange={(e) => handle(e)}
              />
            </div>
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
                required
                value={data.email}
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                PRN No
              </label>
              <input
                type="text"
                id="prn"
                className="formFieldInput"
                placeholder="Enter your PRN No"
                name="prn"
                required
                value={data.prn}
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Contact No
              </label>
              <input
                type="number"
                id="contactno"
                className="formFieldInput"
                placeholder="Enter your Contact No"
                name="ContactNo"
                required
                value={data.contactno}
                onChange={(e) => handle(e)}
              />
            </div>
           
           
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Year of study<br />
                <select
                  onChange={(e) => handle(e)}
                  id="year"
                >
                  <option select value="select">Select</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </label>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Branch<br />
                <select
                  onChange={(e) => handle(e)}
                  id="branch"
                >
                  <option select value="Select">Select</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </label>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Previous Examination<br />
                <select
                  onChange={(e) => handle(e)}
                  id="exam"
                >
                  <option select value="Select">Select</option>
                  <option value="MHT CET">MHT CET</option>
                  <option value="HSC">HSE</option>
                  <option value="Diploma">Diploma</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                </select>
              </label>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Score
              </label>
              <input
                type="text"
                id="score"
                className="formFieldInput"
                placeholder="Enter your Score "
                name="score"
                required
                value={data.score}
                onChange={(e) => handle(e)}
              />
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Category of admission<br />
                <select
                  onChange={(e) => handle(e)}
                  id="category"
                >
                  <option select value="Select">Select</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="VJNT">VJNT</option>
                  <option value="SBC">SBC</option>
                  <option value="SEBC">SEBC</option>
                  <option value="EWS">EWS</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                Blood group (in case of medical enjury)<br />
                <select
                  onChange={(e) => handle(e)}
                  id="bgroup"
                >
                  <option select value="select">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="other">OTHER</option>
                </select>
              </label>
            </div>
            <div>

              <label>
                Gender<br />
                <select
                  onChange={(e) => handle(e)}
                  id="gender"
                >
                  <option select value="Select">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
            <div>

              <label>
                Are You Handicap<br />
                <select
                  onChange={(e) => handle(e)}
                  id="handicap"
                >
                  <option select value="Select">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Any medical enjury or medical allergy
              </label>
              <input
                type="text"
                id="allergy"
                className="formFieldInput"
                placeholder="Any medical enjury or medical allergy"
                name="allergy"
                value={data.allergy}
                onChange={(e) => handle(e)}
              />
            </div>
            <label className="formFieldLabel" htmlFor="password">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              className="formFieldInput"
              placeholder="Date of Birth"
              name="date"
              value={data.date}
              onChange={(e) => handle(e)}
            />


            <div className="formField">
              <label className="formFieldLabel" htmlFor="file">
                Upload Marksheet of Previous Year
              </label>
              <input
                type="file"
                id="file"
                className="formFieldInput"
                placeholder="Any medical enjury or medical allergy"
                name="file"
                required
                value={data.file}
                onChange={(e) => onFileSelect(e)}
              />
            </div>

            <div className="formField">
              <button className="formFieldButton">Apply</button>{" "}

            </div>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Apply;
