import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";
import { Row, Form, Col } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import * as CgIcons from 'react-icons/cg';
import { useHistory, withRouter } from "react-router-dom";
import { Redirect, Route } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';



function Profile() {



  const history = useHistory();

  const url = "http://localhost:3001/api/manager/update";


  const [data, setData] = useState({
    email: "",
    name: "",
    phoneno: "",
    caddress: ""
  });

  const submit = (e) => {

    e.preventDefault();
console.log("We r in submit");
    axios.patch(url, {

      email: data.email,
      name: data.name,
      phoneno: data.phoneno,
      password: data.upassword

    })
      .then(res => {

        if (res.status === 200) {
          window.alert("Profile Updated Successfully")
        }
        else if(res.status == 240){
          window.alert("Email Already Exits");
        }
      })
      .catch(error => {
        console.log(error);
        window.alert("Error")
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
    axios.get("http://localhost:3001/api/manager/fetch").then((response) => {
      console.log(response.data);
      setProfileData(response.data.data)


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
                  required
                  onChange={(e) => handle(e)}
                  placeholder={profileData.email}/>
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
                  required
                  onChange={(e) => handle(e)}
                  placeholder={profileData.name}/>
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
                  required
                  onChange={(e) => handle(e)}
                  placeholder={profileData.phoneno}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="upassword">
              <Form.Label column sm="2">
              Update Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" input-type="textarea"
                  //  id="caddress"
                  value={data.upassword}
                  required
                  onChange={(e) => handle(e)}
                  placeholder={profileData.upassword}/>
              </Col>
            </Form.Group>

           
            <button className="formFieldButton update" type="submit">Update Profile</button>{" "}
          </Form>

         
          {/* <button className="formFieldButton update" onClick={getEmployees}  type="submit">Update user</button> */}



        </div>
      </div>
      <Footer />
      )



    </>
  )

}

export default Profile;
