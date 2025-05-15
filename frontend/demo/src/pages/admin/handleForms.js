import React from 'react'
import { Form } from 'react-bootstrap';
function handleForms() {
  return (
    <>
    <div className='handleForm'>
        <h2>Handle Forms</h2>
    <Form>
  <Form.Check 
    type="switch"
    id="custom-switch"
    label="Form One"
  />
    <Form.Check 
    type="switch"
    id="custom-switch"
    label="Form Two"
  />
  
</Form>
</div>
    </>
  )
}

export default handleForms