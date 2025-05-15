import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Component, useState } from "react";

export const Other = ({ formData, setForm, navigation }) => {

  const { username, password,hostelfeereceipt,vacinationcert, undertaking} = formData;

//   const [selectedfile, setselectedfile] = useState({
//     hostelfeereceipt: "",
//     vacinationcert: "",
//     undertaking: ""

// });
// console.log(selectedfile.hostelfeereceipt )

// formData4.append('hostelfeereceipt', selectedfile.hostelfeereceipt);
// formData5.append('vacinationcert', selectedfile.vacinationcert);
// formData6.append('undertaking', selectedfile.undertaking);

// hostelfeereceipt= selectedfile.hostelfeereceipt;
// vacinationcert = selectedfile.vacinationcert;
// undertaking = selectedfile.undertaking;

function onFileSelect(e) {
  // const files = { ...selectedfile};
  // console.log(files);
  formData[e.target.id] = e.target.files[0];
  // console.log(files)
  // setselectedfile(files);
  // console.log(files);
}

  return (
    <>
    <h2 className="contact">Other Information</h2>
    <Container maxWidth="sm">

      <TextField
        label="Username"
        name="username"
        value={username}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
       <TextField
        label="password"
        name="password"
        type="password"
        value={password}
        onChange={setForm}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="hostel fees receipt"
        name="hostelfeereceipt"
        id="hostelfeereceipt"
        type="file"
        // value={hostelfeereceipt}
        onChange={(e) => onFileSelect(e)}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="vaccination certification"
        name="vacinationcert"
        id="vacinationcert"
        type="file"
        // value={vacinationcert}
        onChange={(e) => onFileSelect(e)}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <TextField
        label="Undertaking"
        name="undertaking"
        id="undertaking"
        type="file"
        // value={undertaking}
        onChange={(e) => onFileSelect(e)}
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