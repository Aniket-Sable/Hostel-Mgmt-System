import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";
import { Row, Form, Col } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from '../common/Footer.js';
import * as CgIcons from 'react-icons/cg';
import { useHistory, withRouter } from "react-router-dom";
import Message from './Message';
import { Redirect, Route } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';



function Profile() {



  const history = useHistory();
  function rcontact() {
    let path = `./message`;
    history.push(path);

  }
  const url = "http://localhost:3001/api/users/user/update";


  const [data, setData] = useState({
    email: "",
    name: "",
    phoneno: "",
    branch: "",
    address: "",
    year: "", 
  });

  const submit = (e) => {

    e.preventDefault();
    console.log("We r in submit");
    axios.patch(url, {

      email: data.email,
      name: data.name,
      branch: data.branch,
      phoneno: data.phoneno,
      address: data.address,
      year: data.year,
    })
      .then(res => {

        if (res.status === 200) {
          window.alert("Profile Updated Successfully")
        }
      })
      .catch(error => {
        console.log(error);
        window.alert("Invalid Data")

      })
  }

  function handle(e) {

    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);

  }



  ////////////////// fetching start///////////
  const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/api/users/user/fetch").then((response) => {
      console.log(response.data.data);
      setProfileData(response.data.data[0])


    });
  }, [])

  ////////////////// fetching End///////////



  return (

    <>



      <div className="left">
        <div className='profile'>
          <h3 className="hello">Hello {profileData.name}</h3>

          <div className="prof-icon">
            <CgIcons.CgProfile />
            {/* {image && <img src={image} alt="img"/>} */}
          </div>
          {/* <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} /> */}
          {/* <h2> {uploadStatus} </h2> */}

          <button style={{ marginLeft: '120px', marginTop: '30px' }} onClick={rcontact} type="submit">Contact Rector</button>
        </div>
        <div className="prof-form">
          <Form onSubmit={(e) => submit(e)}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  //  id="email"
                  value={data.email}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.email} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">
                Full Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"
                  //  id="name" 
                  value={data.name}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.name} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phoneno">
              <Form.Label column sm="2">
                Phone No
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number"
                  //  id="phoneno"
                  value={data.phoneno}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.phoneno} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="branch">
              <Form.Label column sm="2">
                Branch
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" input-type="textarea"
                  //  id="caddress"
                  value={data.branch}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.branch} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="address">
              <Form.Label column sm="2">
                Current Address
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" input-type="textarea"
                  //  id="caddress"
                  value={data.address}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.address} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Year of Study
              </Form.Label>
              <Col sm="10">
                {/* <Form.Control type="text"
                  //  id="year" 
                  value={data.pass}
                  onChange={(e) => handle(e)} 
                  placeholder="Year of Study" /> */}
                <select
                  onChange={(e) => handle(e)}
                  id="year"
                  placeholder={profileData.year}
                >
                  <option select value={profileData.year}>Select</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </Col>

            </Form.Group>

          
            <button className="formFieldButton update" type="submit">Update Profile</button>{" "}
          </Form>


          {/* <button className="formFieldButton update" onClick={getEmployees}  type="submit">Update user</button> */}



        </div>
      </div>
      <Footer />




    </>
  )

}

export default Profile;
