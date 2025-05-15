import React from 'react'
import { Form, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Component, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";


function RemoveM() {

  const url1 = "http://localhost:3001/api/admin/remove";

  const [data, setData] = useState({
    uname: "",
    email: "",
  })

  function submit(e) {

    let array = {
      username: data.uname,
      email: data.email,
    }

    axios({
      url: url1,
      method: "DELETE",
      data: array
    })
      .then(res => {
        if (res.status == 200) {
          window.alert("Manager Removed Successfully!!");
          document.location.href = '/adash/manager'
        }
        else if (res.status == 299) {
          window.alert("Manager Not Found")
        }
      })
      .catch(error => {
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
          <Form.Label>Enter Email</Form.Label>

          <Form.Control
            id='email'
            type="email"
            placeholder="Enter Password"
            name="email"
            required
            value={data.password}
            onChange={(e) => handle(e)}
          />
        </Form.Group>


        <Button
          className="notification next"
          color="primary"
          variant="contained"
          onClick={(e) => submit(e)}
          style={{ marginTop: '20px', width: '150px', marginLeft: '170px' }}
        >
          Remove
        </Button>
      </Form>
    </>
  )
}

export default RemoveM