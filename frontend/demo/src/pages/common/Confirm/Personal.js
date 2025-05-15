import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Form, Col, Row } from 'react-bootstrap';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export const Personal = ({ formData, setForm, navigation }) => {
  const { name, guardiannm, address, district, state, age, dob, category, bloodgp, gender } = formData;

  return (
    <>
      <h2 className="personal">Personal Information</h2>
      <Container >

        <Form>
          <Row>
            
              <Form.Control type="text" value={name} name="name" variant="outlined" placeholder="Enter Full Name" onChange={setForm} />
            
            <Form.Group as={Col} controlId="g_name">
              <Form.Label>Guardian Name</Form.Label>
              <Form.Control type="text" value={guardiannm} name="guardiannm" onChange={setForm} placeholder="Guardian Name" />
            </Form.Group>
          </Row>

          <Form.Group className="address mb-3" controlId="address">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control type="text" placeholder="1234 Main St" value={address} name="address" onChange={setForm} />
          </Form.Group>

          <Row className="city">
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control value={district} name="district" onChange={setForm} />
            </Form.Group>

            <Form.Group as={Col} controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control value={state} name="state" onChange={setForm} />
            </Form.Group>


          </Row>
          <Row className="AgeRow">
            <Form.Group as={Col} controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control value={age} name="age" onChange={setForm} />
            </Form.Group>

            <Form.Group as={Col} controlId="dob">
              <Form.Label>DOB</Form.Label>
              <Form.Control type="date" value={dob} name="dob" onChange={setForm} />
            </Form.Group>


          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="cat">
              <Form.Label>Category</Form.Label>
              <Form.Select defaultValue="Choose..." value={category} name="category" onChange={setForm}>
                <option>Choose...</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="VJNT">VJNT</option>
                <option value="SBC">SBC</option>
                <option value="SEBC">SEBC</option>
                <option value="EWS">EWS</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="bgroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select defaultValue="Choose..." value={bloodgp} name="bloodgp" onChange={setForm}>
                <option>Choose...</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>

              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select defaultValue="Choose..." value={gender} name="gender" onChange={setForm}>
                <option>Choose...</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Button
            variant="contained"
            className="personal-next"
            color="primary"

            onClick={() => navigation.next()}
          >
            Next
          </Button>
        </Form>
      </Container>
    </>
  );
};

{/* <h3>Names</h3>
      <TextField
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={setForm}
        required
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={setForm}
        required
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Nick Name"
        name="nickName"
        value={nickName}
        onChange={setForm}
        required
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={() => navigation.next()}
      >
        Next
      </Button> */}