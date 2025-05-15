import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import axios from 'axios';
import cookie from 'react-cookie';
import NavHome from './NavHome';
import Apply from '../common/Apply';
import Profile from './Profile';
import Allotment from './Allotment';
import Rooms from './Rooms';
import Message from './Message';
import About from './About';
import Contact from '../common/contactus';
import Payment from './Payment';
import Notification from './Notifications';
import { NavDropdown } from 'react-bootstrap';

function Dashboards() {

  const history = useHistory();
  const [user, setuser] = useState([]);

  axios.get("http://localhost:3001/api/users/user/isloggedin").then((response) => {
    console.log(response.data);
    setuser(response.data.name)
  });

  function logout() {
    console.log("in logout")
    const url = "http://localhost:3001/api/users/user/logout";

    axios.get(url, {
      withCredentials:true,
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

  
  ////////////////// fetching start///////////
  const [profileData, setProfileData] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/api/users/user/fetch").then((response) => {
      console.log(response.data.data);
      setProfileData(response.data.data[0])


    });
  }, [])

  ////////////////// fetching End///////////
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (

    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>

          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <NavLink className="nav-link" to="/Dashboard/home">Home</NavLink>
          <NavLink className="nav-link" to="/Dashboard/about">About</NavLink>
          <NavLink className="nav-link" to="/Dashboard/contacts">Contact US</NavLink>


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
            {SidebarData.map((item, index) => {
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

        <Route path="/Dashboard/home" component={NavHome} />
        <Route path='/Dashboard/profile' component={Profile} />
        <Route path='/Dashboard/apply' component={Apply} />
        <Route path='/Dashboard/allotment' component={Allotment} />
        <Route path='/Dashboard/rooms' component={Rooms} />
        <Route path='/Dashboard/message' component={Message} />
        <Route path='/Dashboard/about' component={About} />
        <Route path='/Dashboard/contacts' component={Contact} />
        <Route path='/Dashboard/payment' component={Payment} />
        <Route path='/Dashboard/notification' component={Notification} />

      </IconContext.Provider>
    </>
  );
}

export default Dashboards;
