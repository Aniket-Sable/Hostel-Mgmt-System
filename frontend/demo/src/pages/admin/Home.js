import React, { useState } from 'react'
import Button from "@restart/ui/esm/Button";
import { Card, Form } from 'react-bootstrap';
import Footer from '../common/Footer';
import { useHistory } from 'react-router';
import '../manager/RecDash.css';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import '../css/admin.css'

function Home() {

    const history = useHistory();
    const notice = () => {
        history.push('./notice')
    }
    const [isChecked, setIsChecked] = useState({
        isform1: false,
        isform2: false,
    })
    // console.log("Form1" + isChecked.form1);
    // console.log("Form2" + isChecked.form2);

    const form1 = isChecked.isform1 ? 1 : 0;
    const form2 = isChecked.isform2 ? 1 : 0;

    const url1 = "http//localhost:3001/api/admin/handleforms";
    const url2 = "http//localhost:3001/api/admin/post_common_notice";

    const submit_Form = (e) => {

        e.preventDefault();

        console.log("in submit")

        axios.post(url1, {
            form1: form1,
            form2: form2
        })
            .then(res => {
                if (res.status === 200) {
                    window.alert("Form set Successfully!!")
                }
            })
            .catch(error => {
                console.log(error);
                window.alert("Error")
            })
    }

    const submit_Notice = (e) => {

        e.preventDefault();

        console.log("in submit")

        axios.post(url2, {
            form1: form1,
            form2: form2
        })
            .then(res => {
                if (res.status === 200) {
                    window.alert("Form set Successfully!!")
                }
            })
            .catch(error => {
                console.log(error);
                window.alert("Error")
            })
    }

    const handleForm = (e) => {
        const newdata = { ...isChecked };
        newdata[e.target.id] = (e.target.checked);
        setIsChecked(newdata);

    }

    return (
        <>

            <div className='home'>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-4">
                        <div className="notify">
                            <Card border="primary">
                                <Button className="notification">About Walchand</Button>
                                <Card.Body className="mainpart">
                                    <Card.Text style={{ color: "black" }}>
                                        <p style={{ padding: '15px' }}>In 1947, the college made a modest beginning as New Engineering College, with a single program leading to B.E. (Civil) degree. In 2001, added B.E. program in Information Technology with an intake of 60 students.It became autonomous in 2007. The college revamped its academic structure and contents, in consultation with few US and IIT academic experts.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <div className="notify">
                            <Card border="primary" className="col-lg-6 mb-4">
                                <Button className="notification">About Hostel</Button>
                                <Card.Body className="mainpart">
                                    <Card.Text style={{ color: "black" }}>
                                        <p>The college has an excellent hostel facility for boys since 1958 and for girls since 1987. There are 8 hostel blocks (D1 to D8) with a capacity to accommodate 738 students. In response to the recent trend of increasing number of girl students, two hostel blocks were suitably modified and converted into girls hostels. A total of 130 girl students are presently availing the facility of hostel accommodation. We intend to augment this by another 46 by the beginning of the next academic year.</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div className='handleForm'>
                <div className='main-notice' >
                    <h4 style={{ marginBottom: '25px' }}>Post Upcoming Events</h4 >

                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Title" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                               Upcoming Event
                            </Form.Label >
                            <Col sm={10}>
                                <Form.Control type="text" style={{ "height": "100px" }} placeholder="Enter Event" />
                            </Col>
                        </Form.Group>
                        <Button className="formFieldButton main-notice" onClick={(e) => submit_Notice(e)}>Post </Button>


                    </Form>

                </div>

                <div className='handle'>
                    <h4 style={{ marginBottom: '25px' }}>Handle Forms</h4 >

                    <Form>
                        <Form.Check
                            type="checkbox"
                            id="isform1"
                            name="isform1"
                            checked={isChecked.isform1}
                            onChange={(e) => handleForm(e)}
                            label="Form One"
                        />
                        <Form.Check
                            type="checkbox"
                            id="isform2"
                            name="isform2"
                            checked={isChecked.isform2}
                            onChange={(e) => handleForm(e)}
                            label="Form Two"
                        />
                        <Button className="formFieldButton hanldeForm" onClick={(e) => submit_Form(e)}>Set</Button>


                    </Form>
                </div>


            </div>
            <Button className="formFieldButton notice" onClick={notice}>Post Notice</Button>

            <Footer />
        </>
    );
}
export default Home;