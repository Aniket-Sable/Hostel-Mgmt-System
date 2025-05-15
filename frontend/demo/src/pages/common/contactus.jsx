import React from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from "@restart/ui/esm/Button";
import { Card } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer.js';
import image from '../student/images/aniket.png';
import image1 from '../student/images/sumit.png';
// import image2 from './images/shubham.jpg';
import '../css/Navbar.css'
function contactus() {
    return (
        <>
        <div className='home'>
      </div>
            <div>
                <div className="shubham">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="../images/shubham.png" />
                        <Card.Body>
                            <Card.Title>Shubham Junghare</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Contact</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="shubham">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="../images/sumit.png" />
                        <Card.Body>
                            <Card.Title>Sumit Koundanya</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Contact</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="shubham">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="../images/aniket.png" />
                        <Card.Body>
                            <Card.Title>Aniket Sable</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                            <Button variant="primary">Contact</Button>
                        </Card.Body>
                    </Card>

                </div>
                
            </div>
          
           
        </>
    )
}
export default contactus;