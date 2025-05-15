import React, { useState, useEffect} from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { Homesidebar } from './Homesidebar';
import Allotment from './Allotment';
import Apply from './Apply';
import Notifications from './Notifications';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Home from './Home';
import FirstApp from './FirstApp';
import Button from "@restart/ui/esm/Button";
import Confirm from './Confirm';

function Cdash() {
  let history=useHistory();

  useEffect(() => {

    history.push('/cdash/home');    
}, []);

const signin = () => {
  history.push('/student/sign-in')
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
          <NavLink className="nav-link" to="/cdash/home">Home</NavLink>
          <NavLink className="nav-link" to="/cdash/firstapp">Apply</NavLink>
          <NavLink className="nav-link" to="/cdash/confirm">Confirm Hostel</NavLink>
          <NavLink className="nav-link" to="/cdash/notification">Notifications</NavLink>
          <NavLink className="nav-link" to="/cdash/allot">Allotment List</NavLink>
          {/* <NavLink className="nav-link sign-in" to="/cdash/allot">Sign-In</NavLink> */}
          
         
          <Button variant="outline-success"  onClick={signin}  style={{ color: "rgb(137 45 255)" }} className="sign-in">Sign-In</Button>

        </div>


        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {Homesidebar.map((item, index) => {
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
       
        {/* <Route path="/cdash/home" component={Home} /> */}
        <Route path='/cdash/home' component={Home} />
        <Route path='/cdash/firstapp' component={FirstApp} />
        <Route path='/cdash/confirm' component={Confirm} />
        <Route path='/cdash/allotment' component={Allotment} />
        <Route path='/cdash/notification' component={Notifications} />
       


      </IconContext.Provider>

      </>
    
  )
}

export default Cdash;