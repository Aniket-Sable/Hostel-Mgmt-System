import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Component, useState } from "react";
import { Row, Form, Col, Placeholder } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from '../common/Footer.js';
import * as CgIcons from 'react-icons/cg';
import { useHistory, withRouter } from "react-router-dom";



function Profile() {



  const history = useHistory();

  const url = "http://localhost:3001/api/admin/login/profile";


  const [data, setData] = useState({
    email: "",
    name: "",
    phoneno: "",
    username: ""
  });

  const submit = (e) => {

    e.preventDefault();
    console.log("We r in submit");
    axios.patch(url, {

      email: data.email,
      name: data.name,
      phoneno: data.phoneno,
      username: data.username

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
    axios.get("http://localhost:3001/api/admin/login/fetchadmin").then((response) => {
      console.log(response.data);
      setProfileData(response.data.data)


    });
  }, [])

  ////////////////// fetching End///////////



  return (

    <>



      <div className="left">
        <div className='profile'>
          <h3 className="hello">Hello Admin </h3>

          <div className="prof-icon">
            <CgIcons.CgProfile />
            {/* {image && <img src={image} alt="img"/>} */}
          </div>
          {/* <input type="file" name="image" accept="image/*" multiple={false} onChange={imageHandler} /> */}
          {/* <h2> {uploadStatus} </h2> */}

          {/* <button style={{ marginLeft: '120px', marginTop: '30px' }} onClick={rcontact} type="submit">Contact Rector</button> */}
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
                  required
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
                  required
                  value={data.name}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="username">
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text"
                  //  id="phoneno"
                  required
                  value={data.username}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.username}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="phoneno">
              <Form.Label column sm="2">
                Phone No
              </Form.Label>
              <Col sm="10">
                <Form.Control type="number"
                  //  id="phoneno"
                  required
                  value={data.phoneno}
                  onChange={(e) => handle(e)}
                  placeholder={profileData.phoneno}
                />
              </Col>
            </Form.Group>


            <button className="formFieldButton update" type="submit">Update Profile</button>{" "}
          </Form>


          {/* <button className="formFieldButton update" onClick={getEmployees}  type="submit">Update user</button> */}



        </div>
      </div>
      {/* <Footer /> */}




    </>
  )

}

export default Profile;
