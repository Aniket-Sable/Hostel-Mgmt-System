import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Button from "@restart/ui/esm/Button";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import './Dashboard.css';
import axios from 'axios';
import cookie from 'react-cookie';

 function Dashboard() {


    return (
        <div>
            <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#">Dashboard</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
    <Nav
      className="mr-auto my-2 my-lg-0"
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link to="Dashboard/home">Home</Nav.Link>
      <Nav.Link href="#action2">About</Nav.Link>
      {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
      </NavDropdown> */}
    
    </Nav>
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
      <Button  variant="outline-success">Logout</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}
export default Dashboard;