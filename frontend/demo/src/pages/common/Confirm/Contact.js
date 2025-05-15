import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const Contact = ({ formData, setForm, navigation }) => {
  const { email, prn,adhaar, phoneno,guardianno } = formData;
  return (
    <>
    <h2 className="contact">Contact Details</h2>
    <Container maxWidth="sm">

      <TextField
        label="Email"
        name="email"
        value={email}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
       <TextField
        label="PRN NO"
        name="prn"
        value={prn}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Aadhar No"
        name="adhaar"
        value={adhaar}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Your Phone no"
        name="phoneno"
        value={phoneno}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Guardian Phone No"
        name="guardianno"
        type="number"
        value={guardianno}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
     
      
      <div style={{ marginTop: "1rem" }}>
        <Button
          color="secondary"
          className="contact-back"
          variant="contained"
          style={{ color: "rgb(137 45 255)" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button>
        <Button
          color="primary"
          className="contact-next"
          variant="contained"
          onClick={() => navigation.next()}
        >
          Next
        </Button>
      </div>
    </Container>
    </>
  );
};