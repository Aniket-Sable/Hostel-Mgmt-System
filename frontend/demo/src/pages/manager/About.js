import React from 'react'
import '../css/Navbar.css';
import Footer from './Footer';
export default function About() {
    return (
        <>
         <div className='home'>
      </div>
      <h2 className="Aboutus">About US</h2>
      <div>
        <p className="about-content">
        This web application is about "Hostel management and allocation" with a very easy and handy user interface.

We have developed this application to reduce paper work and shift towards digitalization which is the current demand of world.
Our one of focus is to  minimize the time, efforts and the work of students as well as rector.<br/>

Many automation techniques we have used and Most of the work will be done automatically.

This application is the unit of many things like, Management Section which is used to manage hostel things and facilities, Allocation Section which is used to allocate hostel to the students with the government criteria/rules and Payment Section for students.....you will redirect to a payment gateway like upi, NetBanking, Credit Card, Debit card, etc. for payment purpose.

This application is designed by considering all the security aspects
        </p>
        </div>
        <Footer />
        </>
    )
}
