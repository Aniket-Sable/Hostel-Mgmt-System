import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Button from '@restart/ui/esm/Button';
import './RecDash.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Footer from './Footer'

export default function Applications() {

    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/users/getapplications").then((response) => {
            console.log(response.data);
            setProfileData(response.data.data)


        });
    }, [])


    const sort = () => {
        axios.get("http://localhost:3001/api/users/reclogin/allocated").then((response) => {
            console.log(response.data);
            setProfileData(response.data.data)


        });
    }

    const sortmale = () => {
        axios.get("http://localhost:3001/api/users/reclogin/maleallocated").then((response) => {
            console.log(response.data);
            setProfileData(response.data.data)


        });
    }

    const sortfemal = () => {
        axios.get("http://localhost:3001/api/users/reclogin/femaleallocated").then((response) => {
            console.log(response.data);
            setProfileData(response.data.data)


        });
    }


    // return (
    //     <>
    //         <div>
    //             <h2 className="headline">Applications for the Hostel</h2>
    //             <p className="filter">Filter By</p>
    //             <select className="dropdown">
    //     
    //             
    //               <option select value="select">Select</option>
    //               <option value="Score">Score</option>
    //               <option value="Second Year">Gender</option>
    //               <option value="Third Year">Branch</option>
    //               <option value="Final Year">any</option>
    //             </select>
    //             <button type="submit" className="formFieldButton sort"  onClick={sort}>Sort</button>
    //             <button type="submit" className="formFieldButton male" onClick={sortmale}>Get Boys Application</button>
    //             <button type="submit" className="formFieldButton male" onClick={sortfemal}>Get Girls Application</button>
    //         </div>

    //         <div className="table-alloc">

    //             <table>
    //                 <tr>
    //                     <th>Name</th>
    //                     <th>Email</th>
    //                     <th>Contact No</th>
    //                     <th>Year</th>
    //                     <th>Branch</th>
    //                     <th>Previous Exam</th>
    //                     <th>Score</th>
    //                     <th>Category</th>
    //                     <th>Gender</th>
    //                     <th>Dob</th>
    //                 </tr>
    //             </table>
    //             {
    //                 profileData.map(profile => (
    //                     <table>
    //                         <tr>
    //                             <td>{profile.fullname}</td>
    //                             <td>{profile.email}</td>
    //                             <td>{profile.phoneno}</td>
    //                             <td>{profile.year}</td>
    //                             <td>{profile.branch}</td>
    //                             <td>{profile.lastexam}</td>
    //                             <td>{profile.score}</td>
    //                             <td>{profile.category}</td>
    //                             <td>{profile.gender}</td>
    //                             <td>{profile.dob}</td>
    //                         </tr>
    //                     </table>
    //                 ))
    //             }

    //         </div>
    //         <Footer />

    //     </>
    // )




    return (
        <div className="container">
            <button type="submit" className="formFieldButton sort" onClick={sort}>Sort</button>
            <button type="submit" className="formFieldButton male" onClick={sortmale}>Get Boys Application</button>
            <button type="submit" className="formFieldButton male" onClick={sortfemal}>Get Girls Application</button>            <div className="row mt-4">

            
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
                            <th>Email</th>
                            <th>Contact No</th>
                            <th>Year</th>
                            <th>Branch</th>
                            <th>Previous Exam</th>
                            <th>Score</th>
                            <th>Category</th>
                            <th>Gender</th>
                            <th>Dob</th>
                        </tr>
                    </thead>
                    <tbody>

                        {profileData.map((profile) =>
                            <tr>
                                <td>{profile.fullname}</td>
                                <td>{profile.email}</td>
                                <td>{profile.phoneno}</td>
                                <td>{profile.year}</td>
                                <td>{profile.branch}</td>
                                <td>{profile.lastexam}</td>
                                <td>{profile.score}</td>
                                <td>{profile.category}</td>
                                <td>{profile.gender}</td>
                                <td>{profile.dob}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );



}
