import React, { useState, useEffect} from 'react';
import { useHistory, withRouter } from "react-router-dom";

function Temp() {
    let history=useHistory();

    useEffect(() => {
  
      history.push('/cdash/home');    
  }, []);
  return (
   <h6>h</h6>
  )
}

export default Temp