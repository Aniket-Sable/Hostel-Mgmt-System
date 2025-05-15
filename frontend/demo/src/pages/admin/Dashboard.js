import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Sidebardata } from './Sidebardata';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Home from './Home';
import ManageM from './ManageM';
import ManageR from './ManageR';
import Notice from './Notice';
import { NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import Applications from './Applications';
import Profile from './Profile';
import handleForms from './handleForms';
import About from './About';

function Dashboard() {

  let history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);


  useEffect(() => {

    history.push('/adash/home');
  }, []);

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/admin/login/fetchadmin").then((response) => {
      console.log(response.data);
      setProfileData(response.data.data)


    });
  }, [])

  //////Logout///////

  function logout() {
    console.log("in logout")
    const url = "http://localhost:3001/api/admin/logout";

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


/////////Go TO Profile ////////

  function profile() {
    // document.location.href = 'http://localhost:3000/adash/profile'
    history.push('./profile')
  }



  return (
    <>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>

          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <NavLink className="nav-link" to="/adash/home">Home</NavLink>
          <NavLink className="nav-link" to="/adash/about">About</NavLink>
          <NavLink className="nav-link" to="/adash/contact">Contact US</NavLink>
          {/* <NavLink className="nav-link" to="/adash/handleform">Handle Forms</NavLink> */}

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
          {Sidebardata.map((item, index) => {
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


      <Route path='/adash/home' component={Home} />
      <Route path='/adash/about' component={About} />
      <Route path='/adash/handleform' component={handleForms} />
      <Route path='/adash/profile' component={Profile} />
      <Route path='/adash/manager/' component={ManageM} />
      <Route path='/adash/rooms' component={ManageR} />
      <Route path='/adash/notice' component={Notice} />
      <Route path='/adash/applications' component={Applications} />




    </IconContext.Provider>

    </>

  )
}

export default Dashboard;