import React from 'react'
import axios from 'axios';
import { Component, useState, useEffect } from "react";
import { Form, Col, Row, Card } from 'react-bootstrap';
import { useHistory, withRouter } from "react-router-dom";

function FirstApp() {

    //////////////form state checking ////////////

    const [isOpen, setIsOpen] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/admin/firstformstatus").then((response) => {
            console.log(response.data.status);
            setIsOpen(response.data.status)
        });
    }, [])

    const [selectedfile, setselectedfile] = useState({
        addreceipt: "",
        marksheet: "",
        castcertificate: ""
    });
           


    const [data, setData] = useState({
        name: "",
        email: "",
        prn: "",
        phoneno: "",
        course: "",
        branch: "",
        preexam: "",
        prescore: "",
        category: "",
        gender: "",


    });


    // console.log("isOpen" + isOpen)

    //////////////////////////////////////

    if (isOpen ==0) {
        return (
            <>
                <h2>This Form is not yet open</h2>
            </>
        )
    }
    else {
        
        function submit(e) {

            e.preventDefault();

            console.log(data.name + data.email);
            const formdata = new FormData();
            formdata.append("name", data.name);
            formdata.append("email", data.email);
            formdata.append("prn", data.prn);
            formdata.append("phoneno", data.phoneno);
            formdata.append("course", data.course);
            formdata.append("branch", data.branch);
            formdata.append("preexam", data.preexam);
            formdata.append("prescore", data.prescore);
            formdata.append("category", data.category);
            formdata.append("gender", data.gender);

            formdata.append("addreceipt", selectedfile.addreceipt);
            formdata.append("marksheet", selectedfile.marksheet);
            formdata.append("castcertificate", selectedfile.castcertificate);


            axios.post("http://localhost:3001/api/users/firstapply", formdata)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        window.alert("Application submitted successfully!!");
                        document.location.href = '/cdash/home'
                    }
                }).catch(error => {
                    console.log(error);
                    window.alert("Please Enter Valid Data");
                })
        };

        function handle(e) {
            const newdata = { ...data };
            newdata[e.target.id] = e.target.value;
            setData(newdata);
            // console.log(newdata);
        }

        function onFileSelect(e) {
            const files = { ...selectedfile };
            files[e.target.id] = e.target.files[0];
            setselectedfile(files);
        }

        return (
            <>
                <div className='reports'>
                    <div className="apply-form">
                        <h2 style={{ textAlign: 'center' }}>Application Form 1</h2>
                        <form action="#" className="formFields" onSubmit={(e) => submit(e)}>
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
                                    PRN
                                </label>
                                <input
                                    type="text"
                                    id="prn"
                                    className="formFieldInput"
                                    placeholder="Enter your PRN No"
                                    name="prn"
                                    required
                                    // onChange={event => {
                                    //     const { value } = event.target;
                                    //     setData.prn(value);
                                    // }}
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
                                    id="phoneno"
                                    className="formFieldInput"
                                    placeholder="Enter your Contact No"
                                    name="phoneno"
                                    required
                                    value={data.contactno}
                                    onChange={(e) => handle(e)}
                                />
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
                                    Year of study<br />
                                    <select
                                        onChange={(e) => handle(e)}
                                        id="course"
                                    >
                                        <option select value="select">Select</option>
                                        <option value="First Year Diploma">First Year(Diploma)</option>
                                        <option value="Second Year Diploma">Second Year(Diploma)</option>
                                        <option value="Third Year Diploma">Third Year(Diploma)</option>
                                        <option value="First Year B.Tech">First Year(B.Tech)</option>
                                        <option value="Second Year B.Tech">Second Year(B.Tech)</option>
                                        <option value="Third Year B.Tech">Third Year(B.Tech)</option>
                                        <option value="Final Year B.Tech">Final Year(B.Tech)</option>
                                        <option value="First Year M.Tech">First Year(M.Tech)</option>
                                        <option value="Second Year M.Tech">Second Year(M.Tech)</option>
                                    </select>
                                </label>
                            </div>

                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="email">
                                    Previous Examination (on which basis you got admission in wce)<br />
                                    <select
                                        onChange={(e) => handle(e)}
                                        id="preexam"
                                    >
                                        {(() => {
                                            switch (data.course) {

                                                case 'First Year Diploma':
                                                    return (
                                                        <option value="SSC">SSC</option>
                                                    )
                                                case 'Second Year Diploma':
                                                    return (
                                                        <option value="First Year Diploma">First Year Diploma</option>
                                                    )
                                                case 'Third Year Diploma':
                                                    return (
                                                        <option value="Second Year Diploma">Second Year Diploma</option>
                                                    )
                                                case 'First Year B.Tech':
                                                    return (
                                                        <>
                                                            <option value="HSC">HSC</option>
                                                            <option value="CET">CET</option>
                                                        </>
                                                    )
                                                case 'Second Year B.Tech':
                                                    return (
                                                        <>
                                                            <option value="First Year B.Tech">First Year B.Tech</option>
                                                            {/* <option value="Third Year Diploma">Third Year Diploma</option> */}
                                                        </>
                                                    )
                                                case 'Third Year B.Tech':
                                                    return (
                                                        <option value="Second Year B.Tech">Second Year B.Tech</option>
                                                    )
                                                case 'Final Year B.Tech':
                                                    return (
                                                        <option value="Third Year B.Tech">Third Year B.Tech</option>
                                                    )
                                                case 'First Year M.Tech':
                                                    return (
                                                        <option value="Final Year B.Tech">Final Year B.Tech</option>
                                                    )
                                                case 'Second Year M.Tech':
                                                    return (
                                                        <option value="First Year M.Tech">First Year M.Tech</option>
                                                    )
                                            }
                                        })()}
                                    </select>


                                </label>
                            </div>
                            {/* <div className="formField">
                            <label className="formFieldLabel" htmlFor="email">
                                Previous Exam Score
                            </label>
                            <input
                                type="text"
                                id="prescore"
                                className="formFieldInput"
                                placeholder="Enter your Score "
                                name="score"
                                required
                                value={data.score}
                                onChange={(e) => handle(e)}
                            />
                        </div> */}
                            {(() => {
                                switch (data.course) {

                                    case 'First Year Diploma':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter SSC Score</Form.Label>
                                                <Form.Control placeholder="For Ex. 91.40" id="prescore" name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                    case 'Second Year Diploma':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter First Year Diploma Score</Form.Label>
                                                <Form.Control placeholder="For Ex. 91.40" id="prescore"
                                                    name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                    case 'Third Year Diploma':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter Second Year Diploma Score</Form.Label>
                                                <Form.Control placeholder="For Ex. 91.40" id="prescore" name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )

                                    case 'First Year B.Tech':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter {data.preexam}  Score</Form.Label>
                                                {(() => {

                                                    if (data.preexam === 'HSE') {
                                                        return (
                                                            <Form.Control placeholder="For Ex. 75.23" id="prescore" name="prescore" value={data.prescore}
                                                                onChange={(e) => handle(e)} />
                                                        )
                                                    }
                                                    else if (data.preexam === 'CET') {
                                                        return (
                                                            <Form.Control placeholder="For Ex. 91.8141190" id="prescore" name="prescore" value={data.prescore}
                                                                onChange={(e) => handle(e)} />
                                                        )
                                                    }
                                                    else if (data.preexam === 'Third Year Diploma') {
                                                        return (
                                                            <Form.Control placeholder="For Ex. 91.81" id="prescore" name="prescore" value={data.prescore}
                                                                onChange={(e) => handle(e)} />
                                                        )
                                                    }

                                                })()}
                                            </Form.Group>
                                        )
                                    case 'Second Year B.Tech':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter First Year B.Tech Score (CGPA)</Form.Label>
                                                <Form.Control placeholder="For Ex. 8.41" id="prescore" value={data.prescore} name="prescore" onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                    case 'Third Year B.Tech':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter Second Year B.Tech Score (CGPA)</Form.Label>
                                                <Form.Control placeholder="For Ex. 8.41" id="prescore" name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                    case 'Final Year B.Tech':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter Third Year B.Tech Score (CGPA)</Form.Label>
                                                <Form.Control placeholder="For Ex. 8.41" id="prescore" name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                    case 'First Year M.Tech':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter Final Year B.Tech Score</Form.Label>
                                                <Form.Control placeholder="For Ex. 8.41" id="prescore" name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                    case 'Second Year M.Tech':
                                        return (
                                            <Form.Group as={Col} controlId="formGridZip">
                                                <Form.Label>Enter First Year M.Tech Score</Form.Label>
                                                <Form.Control placeholder="For Ex. 8.41" id="prescore" name="prescore" value={data.prescore}
                                                    onChange={(e) => handle(e)} />
                                            </Form.Group>
                                        )
                                }
                            })()}
                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="email">
                                    Category of admission<br />
                                    <select
                                        onChange={(e) => handle(e)}
                                        id="category">
                                        <option select value="Select">Select</option>
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">NT</option>
                                        <option value="VJNT">VJNT</option>
                                        <option value="SBC">EWS</option>
                                        <option value="SEBC">SBC</option>
                                        <option value="EWS">OPEN-SEBC</option>
                                        <option value="EWS">ST</option>
                                        <option value="EWS">NT-B</option>
                                        <option value="EWS">NT-C</option>
                                        <option value="Other">NT-D</option>
                                        <option value="Other">VJ</option>
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
                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="file">
                                    Walchand Admission Receipt
                                </label>
                                <input
                                    type="file"
                                    id="addreceipt"
                                    className="formFieldInput"
                                    placeholder="Any medical enjury or medical allergy"
                                    name="addreceipt"
                                    required
                                    // value={selectedfile.receipt}
                                    onChange={(e) => onFileSelect(e)}
                                />
                            </div>
                            <div className="formField">
                                <label className="formFieldLabel" htmlFor="file">
                                    Previous Year Marksheet
                                </label>
                                <input
                                    type="file"
                                    id="marksheet"
                                    className="formFieldInput"
                                    placeholder="Any medical enjury or medical allergy"
                                    name="marksheet"
                                    required
                                    // value={selectedfile.marksheet}
                                    onChange={(e) => onFileSelect(e)}
                                />
                            </div>

                            {(() => {
                                console.log(data.category)
                                if (data.category != 'General' && data.category != '') {
                                    return (
                                        <div className="formField">
                                            <label className="formFieldLabel" htmlFor="file">
                                                Cast Certificate
                                            </label>
                                            <input
                                                type="file"
                                                id="castcertificate"
                                                className="formFieldInput"
                                                placeholder="Any medical enjury or medical allergy"
                                                name="castcertificate"
                                                // value={selectedfile.castcertificate}
                                                onChange={(e) => onFileSelect(e)}
                                            />
                                        </div>
                                    )
                                }
                            })()}

                            <div className="formField">
                                <button className="formFieldButton" type="submit">Apply</button>{" "}

                            </div>

                        </form>
                    </div>
                </div>


            </>
        )
    }
}

export default FirstApp;






























// import React, { useState } from "react";

// import "./Apple.css";
// import Axios from "axios";

// function App() {
//   const [name, setName] = useState();
//   const [prn, setPrn] = useState();
//   const [file, setFile] = useState();
//   const [file2, setFile2] = useState();

//   const send = event => {
//     const data = new FormData();
//     data.append("name", name);
//     data.append("prn", prn);
//     data.append("markshet", file);
//     data.append("receipt", file2);

//     Axios.post("https://httpbin.org/anything", data)
//       .then(res => console.log(res))
//       .catch(err => console.log(err));
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         <form action="#">
//           <div className="flex">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               onChange={event => {
//                 const { value } = event.target;
//                 setName(value);
//               }}
//             />
//           </div>

//           <div className="flex">
//             <label htmlFor="prn">prn</label>
//             <input
//               type="text"
//               id="prn"
//               onChange={event => {
//                 const { value } = event.target;
//                 setPrn(value);
//               }}
//             />
//           </div>
//           <div className="flex">
//             <label htmlFor="file">File</label>
//             <input
//               type="file"
//               id="file"
//               accept=".jpg"
//               onChange={event => {
//                 const file = event.target.files[0];
//                 setFile(file);
//               }}
//             />
//           </div>
//           <div className="flex">
//             <label htmlFor="file2">File</label>
//             <input
//               type="file"
//               id="file2"
//               accept=".jpg"
//               onChange={event => {
//                 const file = event.target.files[0];
//                 setFile2(file);
//               }}
//             />
//           </div>
//         </form>
//         <button onClick={send}>Send</button>
//       </header>
//     </div>
//   );
// }

// export default App;