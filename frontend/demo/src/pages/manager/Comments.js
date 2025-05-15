import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Card, Row } from 'react-bootstrap';
// import './Dashboard.css';
function Comments() {


    const [comment, setcomment] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/manager/comments").then((response) => {
            console.log(response.data);
            setcomment(response.data.data)


        });
    }, [])


    return (
        <>
         
                {
                    comment.map(comment => (
                        <div className="row">
                        <div className="column">
                        <div className="mard">
                                <div>
                                    <Card.Body>
                                   
                                        <Card.Subtitle className="">{comment.title}</Card.Subtitle>
                                        <br/>
                                        <div className='bd'>
                                        <Card.Subtitle className="block">Block: {comment.block}</Card.Subtitle>
                                        <br/>
                                        <Card.Subtitle className="date">Date: {comment.date}</Card.Subtitle>
                                        <br/>
                                        </div>
                                        <Card.Text>
                                            {comment.comment}
                                        </Card.Text>

                                    </Card.Body>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))
                }
          
        </>
    )
}
export default Comments;