import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { RecSideBar } from './RecSideBar';
import '../css/Navbar.css';
import { IconContext } from 'react-icons';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import RectHome from './RectHome';
import AllocRooms from './AllocRooms';
import About from './About';
import Contact from '../common/contactus';
import Applications from './Applications';
import Profile from './Profile';
import Notice from './Notice';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Comments from './Comments';

 function RectorDash() {

  const history = useHistory();
  const [user, setuser] = useState([]);

  const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/api/manager/fetch").then((response) => {
      console.log(response.data);
      setProfileData(response.data.data)


    });
  }, [])


  function logout() {
    console.log("in logout")
    const url = "http://localhost:3001/api/manager/logout";

    axios.get(url, {
      withCredentials: true,
    })
      .then(res => {
        console.log(res);
        console.log(res.status);

        if (res.status === 200) {
          document.location.href = 'http://localhost:3000/'
        }
        else {
          window.alert("no")
        }

      })
      .catch(error => {
        console.log(error);
        window.alert("backend issue")
      })
  }

  function profile() {
    history.push('./profile')
  }
    
        const [sidebar, setSidebar] = useState(false);

        const showSidebar = () => setSidebar(!sidebar);
      
        return (
            <>
            <IconContext.Provider value={{ color: '#fff' }}>
              <div className='navbar'>
      
                <Link to='#' className='menu-bars'>
                  <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <NavLink className="nav-link" to="/Dash/home">Home</NavLink>
                <NavLink className="nav-link" to="/Dash/about">About</NavLink>
                <NavLink className="nav-link" to="/Dash/contacts">Contact US</NavLink>
      
                <div className='user'>
            <NavDropdown title={profileData.name}>
              <NavDropdown.Item onClick={profile}>profile</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>sign out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      
              
              <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                  <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {RecSideBar.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
             
             
              <Route path="/Dash/home" component={RectHome} />
              <Route path="/Dash/profile" component={Profile} />
              <Route path="/Dash/notice" component={Notice} />
              <Route path="/Dash/queries" component={Comments} />
              <Route path='/Dash/about' component={About} />
              <Route path='/Dash/contacts' component={Contact} />
              <Route path='/Dash/allocrooms' component={AllocRooms} />
              <Route path='/Dash/applications' component={Applications} />
              
             
      
      
            </IconContext.Provider>
          </>
    );
}
export default RectorDash;