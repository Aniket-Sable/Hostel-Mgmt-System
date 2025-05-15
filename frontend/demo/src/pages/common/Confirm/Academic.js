import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Form, Col, Row, Card } from 'react-bootstrap';
import { Component, useState } from "react";


export const Academic = ({ formData, setForm, navigation }) => {
  let { course, year, branch, preexam, prescore, addmissionreceipt, previousmarksheet, castcertificate, category } = formData;


  console.log(preexam);
  // console.log(year);

  function onFileSelect(e) {
    formData[e.target.id] = e.target.files[0];

  }


  return (
    <>
      <h2 className="personal">Academic Details</h2>
      <Container >
        <Form>
          <Row>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Course</Form.Label>
              <Form.Select defaultValue="Choose..." value={course} name="course" onChange={setForm}>
                <option>Choose...</option>
                <option>Diploma</option>
                <option>B.Tech</option>
                <option>M.Tech</option>

              </Form.Select>
            </Form.Group>


            {(() => {
              switch (course) {

                case 'Diploma':

                  return (
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Year</Form.Label>
                      <Form.Select defaultValue="Choose..." value={year} name="year" onChange={setForm}>
                        <option>Choose...</option>
                        <option>First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                      </Form.Select>
                    </Form.Group>
                  )

                case 'B.Tech':

                  return (
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Year</Form.Label>
                      <Form.Select defaultValue="choose..." value={year} name="year" onChange={setForm}>
                        <option>Choose...</option>
                        <option >First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                        <option>Final Year</option>
                      </Form.Select>
                    </Form.Group>
                  )
                case 'M.Tech':

                  return (
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Year</Form.Label>
                      <Form.Select defaultValue="Choose..." value={year} name="year" onChange={setForm}>
                        <option>Choose...</option>
                        <option>First Year</option>
                        <option>Second Year</option>
                      </Form.Select>
                    </Form.Group>
                  )


              }
            })()}


            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Branch</Form.Label>
              <Form.Select defaultValue="Choose..." value={branch} name="branch" onChange={setForm}>
                <option>Choose...</option>
                <option>Civil</option>
                <option>Electrical</option>
                <option>Electronics</option>
                <option>Mechanical</option>
                <option>Computer Science</option>
                <option>Information Technology</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row className="city">

            {(() => {
              if (course == "B.Tech") {
                switch (year) {

                  case 'First Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="HSE" value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>HSC</option>
                          <option>CET</option>
                          <option>JEE</option>
                        </Form.Select>
                      </Form.Group>
                    )

                  case 'Second Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>First Year</option>
                          <option>Third Year Diploma</option>
                        </Form.Select>
                      </Form.Group>
                    )

                  case 'Third Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>Second Year</option>
                        </Form.Select>
                      </Form.Group>
                    )

                  case 'Final Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>Third Year</option>
                        </Form.Select>
                      </Form.Group>
                    )
                }


              }


              if (course == "M.Tech") {
                switch (year) {

                  case 'First Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>Gate</option>
                        </Form.Select>
                      </Form.Group>
                    )

                  case 'Second Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>First Year</option>
                        </Form.Select>
                      </Form.Group>
                    )

                }
              }


              if (course == "Diploma") {
                switch (year) {

                  case 'First Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>SSC</option>
                        </Form.Select>
                      </Form.Group>
                    )

                  case 'Second Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>First Year</option>
                        </Form.Select>
                      </Form.Group>
                    )

                  case 'Third Year':

                    return (
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Previous Year Exam (On which basis you got the admission in wce)</Form.Label>
                        <Form.Select defaultValue="Choose..." value={preexam} name="preexam" onChange={setForm}>
                          <option>Choose...</option>
                          <option>Second Year</option>
                        </Form.Select>
                      </Form.Group>
                    )

                }
              }
            })()}



            {/* ///////// Pre Score////////// */}
            {(() => {
              
              if (course == "B.Tech") {
                switch (preexam) {

                  case 'First Year':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter First Year Score (CGPA)</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                      </Form.Group>
                    )

                  case 'Second Year':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter Second Year Score (CGPA)</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                      </Form.Group>
                    )

                  case 'Third Year':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter Third Year Score (CGPA)</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                      </Form.Group>
                    )

                  case 'Third Year Diploma':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter Third Year Diploma Score (CGPA)</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                      </Form.Group>
                    )

                }


              }

              if (course == "Diploma") {

                switch (preexam) {

                  case 'SSC':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter SSE Score</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex.91.40" onChange={setForm} />
                      </Form.Group>
                    )

                  case 'First Year':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter First Year Score (CGPA)</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                      </Form.Group>
                    )

                  case 'Second Year':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter Second Year Score (CGPA)</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                      </Form.Group>
                    )
                }
              }


              if (course == "M.Tech") {

                switch (preexam) {

                  case 'Gate':

                    return (
                      <Form.Group as={Col} controlId="name">
                        <Form.Label>Enter Gate Score</Form.Label>
                        <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 55" onChange={setForm} />
                      </Form.Group>
                    )
                    case 'First Year':

                      return (
                        <Form.Group as={Col} controlId="name">
                          <Form.Label>Enter First Year Score (CGPA)</Form.Label>
                          <Form.Control type="text" value={prescore} name="prescore" variant="outlined" placeholder="For Ex. 8.50" onChange={setForm} />
                        </Form.Group>
                      )
                }
              }




            })()}

          </Row>

          <Row>
            <Form.Group as={Col}>
              <Form.Label>Score Card of Previous Year</Form.Label>
              <Form.Control type="file" id="previousmarksheet" name="previousmarksheet" onChange={(e) => onFileSelect(e)} />
            </Form.Group>
            <Form.Group as={Col} >
              <Form.Label>Admission Receipt</Form.Label>
              <Form.Control type="file" id="addmissionreceipt" name="addmissionreceipt" onChange={(e) => onFileSelect(e)} />
            </Form.Group>

            {(() => {

              if (category != 'General') {
                return (
                  <Form.Group as={Col}>
                    <Form.Label>Cast Certificate</Form.Label>
                    <Form.Control type="file" id="castcertificate" name="castcertificate" onChange={(e) => onFileSelect(e)} />
                  </Form.Group>
                )
              }
            })()}

          </Row>

          <div style={{ marginTop: "1rem" }}>
            <Button
              color="secondary"
              variant="contained"
              className="back"
              style={{ color: "rgb(137 45 255)" }}
              onClick={() => navigation.previous()}
            >
              Back
            </Button>
            <Button
              className="notification next"
              color="primary"
              variant="contained"
              onClick={() => navigation.next()}
            >
              Next
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};