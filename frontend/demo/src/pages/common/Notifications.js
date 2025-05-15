import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Card } from 'react-bootstrap';
// import './Dashboard.css';
function Notifications() {


    const [notification, setnotification] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/users/login/notify").then((response) => {
            console.log(response.data);
            setnotification(response.data.data)


        });
    }, [])


    return (
        <>
         
                {
                    notification.map(notification => (
                        <div className="row">
                        <div className="column">
                        <div className="mard">
                                <div>
                                    <Card.Body>
                                        {/* <Card.Title>Dated: {notification.date}</Card.Title> */}
                                        <Card.Subtitle className="">Dated: {notification.date}</Card.Subtitle>
                                        <Card.Text>
                                            {notification.notice}
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
export default Notifications;