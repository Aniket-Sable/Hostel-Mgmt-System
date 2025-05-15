import React from 'react'
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import AddM from './AddM';
import RemoveM from './RemoveM';
function ManageM() {
  return (
    <>
        <div className="manageM">
            <div className="pageSwitcher">
              <NavLink
                to="/adash/manager/"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
               Add 
              </NavLink>
              <NavLink
                exact
                to="/adash/manager/remove"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Remove
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/adash/manager/"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Add
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/adash/manager/remove"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Remove
              </NavLink>
            </div>

            <Route exact path="/adash/manager/" component={AddM} />
            <Route path="/adash/manager/remove" component={RemoveM} />
          </div>
         
        
    </>
  )
}

export default ManageM