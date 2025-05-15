import React from 'react'
import { Form, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Component, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";


function AddM() {

  const url1 = "http://localhost:3001/api/admin/addmanager";

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    department: "",
    uname: "",
    password: "",
    b1: "",
    b2: ""
  })
console.log(data.department)
  function submit(e) {

    let array = {
      name: data.name,
      email: data.email,
      phoneno: data.phoneno,
      department: data.department,
      username: data.uname,
      password: data.password,
      block1: data.b1,
      block2: data.b2
    }

    axios({
      url: url1,
      method: "POST",
      data: array
    }).then(res => {
      console.log(res.data);
      if (res.status == 200) {
        window.alert("Manager Added successfully!!");
        document.location.href = '/adash/home'
      }else if(res.status == 299){
        window.alert("Manager Already Exists")
      }
    }).catch(error => {
      console.log(error);
      window.alert("Please Enter Valid Data");
    })

  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <>

      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter Name of Manager</Form.Label>

          <Form.Control
            id='name'
            name="name"
            required
            value={data.name}
            onChange={(e) => handle(e)}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter Email of Manager</Form.Label>

          <Form.Control
            id='email'
            name="email"
            required
            value={data.email}
            onChange={(e) => handle(e)}
            type="text"
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter Phone No</Form.Label>

          <Form.Control
            id='phoneno'
            name="phoneno"
            required
            value={data.phoneno}
            onChange={(e) => handle(e)}
            type="number"
            placeholder="Enter Phone no"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Enter Username</Form.Label>

          <Form.Control
            id='uname'
            name="uname"
            required
            value={data.uname}
            onChange={(e) => handle(e)}
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Enter Password</Form.Label>

          <Form.Control
            id='password'
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={data.password}
            onChange={(e) => handle(e)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Enter Department</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => handle(e)} id="department" >
            <option>Choose...</option>
            <option>CSE</option>
            <option>IT</option>
            <option>ELECTRONICS</option>
            <option>MECHANICAL</option>
            <option>ELECTRICAL</option>
            <option>CIVIL</option>
          </Form.Select>
        </Form.Group>
        <Row className="city">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Block One</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(e) => handle(e)} id="b1" >
              <option>Choose...</option>
              <option value="D1">D1</option>
              <option value="D2">D2</option>
              <option value="D3">D3</option>
              <option value="D4">D4</option>
              <option value="D5">D5</option>
              <option value="D6">D6</option>
              <option value="D7">D7</option>
              <option value="D8">D8</option>
              <option value="Cyber">Cyber</option>
              {/* <option>D5</option> */}

            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Block Two</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(e) => handle(e)} id="b2">
              <option>Choose...</option>
              <option value="D1">D1</option>
              <option value="D2">D2</option>
              <option value="D3">D3</option>
              <option value="D4">D4</option>
              <option value="D5">D5</option>
              <option value="D6">D6</option>
              <option value="D7">D7</option>
              <option value="D8">D8</option>
              <option value="Cyber">Cyber</option>
            </Form.Select>
          </Form.Group>


        </Row>
        <Button
          className="notification next"
          color="primary"
          variant="contained"
          onClick={(e) => submit(e)}
          style={{ marginTop: '20px', width: '150px', marginLeft: '170px' }}
        >
          Add Manager
        </Button>
      </Form>
    </>
  )
}

export default AddM