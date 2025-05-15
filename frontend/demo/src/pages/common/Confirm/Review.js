import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetail from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export const Review = ({ formData, navigation }) => {
  const { go } = navigation;
  const {
    name,
    guardiannm,
    address,
    district,
    state,
    age,
    dob,
    category,
    bloodgp,
    gender,
    course,
    year,
    branch,
    preexam,
    prescore,
    addmissionreceipt,
    previousmarksheet,
    castcertificate,
   
    email,
    prn,
    adhaar,
    phoneno,
    guardianno,

    //other

    username,
    password,
    hostelfeereceipt,
    vacinationcert,
    undertaking

  } = formData;

// console.log(formData)
// console.log(formData1.admissionreceipt + formData2 + formData3)

const data = new FormData();

data.append("name", name);
data.append("guardiannm", guardiannm);
data.append("address", address);
data.append("district", district);
data.append("state", state);
data.append("age", age);
data.append("dob", dob);
data.append("category", category);
data.append("bloodgp", bloodgp);
data.append("gender", gender);
data.append("course", course);
data.append("year", year);
data.append("branch", branch);
data.append("preexam", preexam);
data.append("prescore", prescore);
data.append("email", email);
data.append("prn", prn);
data.append("adhaar", adhaar);
data.append("phoneno", phoneno);
data.append("guardianno", guardianno);
data.append("username", username);
data.append("password", password);
data.append("hostelfeereceipt", hostelfeereceipt);
data.append("vacinationcert", vacinationcert);
data.append("addmissionreceipt", addmissionreceipt);
data.append("previousmarksheet", previousmarksheet);
data.append("castcertificate", castcertificate);
data.append("undertaking", undertaking);


  const url1 = "http://localhost:3001/api/users/secondapply";

  function submit() {

    axios.post(url1, data).then(res => {
      if (res.status === 245) {
        window.alert("You are not eligible for next process");
      }else if(res.status=== 200){
        window.alert("Hostel Confirmed!!");
        document.location.href = '/cdash/home'
      }else if(res.status=== 240){
        window.alert("Email/PRN should be unique");
      }
       else {
        window.alert("no")
      }
    }).catch(error => {
      console.log(error);
      window.alert("Error in file uploading!!");
    })
  }
  return (
    <>
      <h2 className="Review">Review</h2>
      <Container maxWidth='sm'>


        <RenderAccordion summary="Personal" go={go} details={[
          { 'Full Name': name },
          { 'Guardian Name': guardiannm },
          { 'Address': address },
          { 'Address': address },
          { 'city': district },
          { 'state': state },
          { 'age': age },
          { 'dob': dob },
          { 'gender': gender },
          { 'category': category },
          { 'dobgroupb': bloodgp },

        ]} />

        <RenderAccordion summary="Academic" go={go} details={[
          { 'course': course },
          { 'Year': year },
          { 'Branch': branch },
          { 'pre_exam': preexam },
          { 'score': prescore },
          { 'scorecard': previousmarksheet },
          { 'admission_receipt': addmissionreceipt },
          { 'cast_certificate': castcertificate},
        ]} />
        <RenderAccordion summary="Contact" go={go} details={[
          { 'email': email },
          { 'prn': prn },
          { 'aadhar_no': adhaar },
          { 'phone': phoneno },
          { 'g_phone': guardianno },
        ]} />
          <RenderAccordion summary="other" go={go} details={[
          { 'Username': username },
          { 'Password': password},
          { "Hostel Fees Receipt" : hostelfeereceipt},
          { "Vaccination Certificate": vacinationcert},
          { "Undertakin": undertaking}
         
        ]} />
        <Button
          color="primary"
          variant="contained"
          className="confirm-submit"
          style={{ marginTop: '1.5rem' }}
          onClick={submit}
        >
          Submit
        </Button>

      </Container>
    </>

  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >{summary}</AccordionSummary>
    <AccordionDetail>
      <div>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>

        })}
        <IconButton
          color="primary"
          component="span"
          onClick={() => go(`${summary.toLowerCase()}`)}
        ><EditIcon /></IconButton>
      </div>
    </AccordionDetail>
  </Accordion>
)