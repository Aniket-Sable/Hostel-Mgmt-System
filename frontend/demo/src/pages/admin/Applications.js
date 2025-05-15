import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@restart/ui/esm/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Form, Col, Row, Card } from 'react-bootstrap';
import '../css/admin.css'


export default function Applications() {

    useEffect(() => {
        axios.get("http://localhost:3001/api/admin/getfirstapplications").then((response) => {
            console.log(response.data);
            setProfileData(response.data)


        });
    }, [])


    const [profileData, setProfileData] = useState([]);

    const [data, setData] = useState({
        gender: "",
        course: "",
        year: "",
        seats: ""
    })

    console.log(data.gender)
    
    function submit(e) {
       
        axios.post("http://localhost:3001/api/admin/criteria",{
            gender: data.gender,
            program: data.course,
            year: data.year,
            seats: data.seats
        }).then(res => {
            console.log(res);
            if(res.status == 200){
                window.alert("critetria added successfully");
                    
            }
        }).catch(error => {
            console.log(error);
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
            <div className='criteria'>
                <Form>
                    <h2 style={{ marginTop: '30px', marginLeft: '20px' }}>Set Criteria</h2>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select defaultValue="Choose..." id="gender" onChange={(e) => handle(e)} name="gender">
                                <option>Choose...</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Program</Form.Label>
                            <Form.Select defaultValue="Choose..." id="course" onChange={(e) => handle(e)} name="course">
                                <option>Choose...</option>
                                <option>Diploma</option>
                                <option>B.Tech</option>
                                <option>M.Tech</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Year</Form.Label>
                            <Form.Select defaultValue="Choose..." id="year" onChange={(e) => handle(e)} name="year">
                                <option>Choose...</option>
                                <option>First Year</option>
                                <option>Second Year</option>
                                <option>Third Year</option>
                                <option>Final Year</option>

                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Enter No of Vacancies</Form.Label>
                            <Form.Control 
                            placeholder="For Ex. 30"
                            name="seats"
                            id="seats"
                            onChange={(e) => handle(e)} />
                        </Form.Group>
                    </Row>

                    <div className="formField">
                        <button className="formFieldButton" type="submit" onClick={(e) => submit(e)}>Apply</button>{" "}

                    </div>
                </Form>
            </div>
            <div className="container">
                {/* <button type="submit" className="formFieldButton sort" onClick={sort}>Sort</button>
            <button type="submit" className="formFieldButton male" onClick={sortmale}>Get Boys Application</button>
            <button type="submit" className="formFieldButton male" onClick={sortfemal}>Get Girls Application</button>             */}
                <div className="row mt-4">


                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="download-table-xls-button btn btn-success mb-3"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download Data" />
                    <table className="table" id="table-to-xls">
                        <thead className="thead-dark">
                            <tr className='table-row'>
                                <th>Name</th>
                                <th>PRN</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Year</th>
                                <th>Branch</th>
                                <th>Previous Exam</th>
                                <th>Score</th>
                                <th>Category</th>
                                <th>Gender</th>
                                <th>Admission Receipt</th>
                                <th>Marksheet</th>
                                {/* <th>Cast</th> */}
                                {/* <th>Gender</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {profileData.map((profile) =>
                                <tr>
                                    <td>{profile.name}</td>
                                    <td>{profile.prn}</td>
                                    <td>{profile.email}</td>
                                    <td>{profile.phoneno}</td>
                                    <td>{profile.course}</td>
                                    <td>{profile.branch}</td>
                                    <td>{profile.preexam}</td>
                                    <td>{profile.prescore}</td>
                                    <td>{profile.category}</td>
                                    <td>{profile.gender}</td>
                                    <td>{profile.addmarksheet}</td>
                                    <td>{profile.addreceipt}</td>
                                    <img src={profile.addreceipt} />
                                    {/* <td>{profile.castcertificate}</td> */}
                                    {/* <td>{profile.dob}</td> */}
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );



}
