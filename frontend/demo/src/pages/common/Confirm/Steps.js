import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { Personal } from "./Personal";
import { Academic } from "./Academic";
import { Contact } from "./Contact";
import { Review } from "./Review";
import { Submit } from "./Submit";
import { Other } from "./Other";

let data = new FormData();

let defaultData = {

  //Personal

  name: "",
  guardiannm: "",
  address: "",
  district: "",
  state: "",
  age: "",
  dob: "",
  category: "",
  bloodgp: "",
  gender: "",

  //Academic

  course: "",
  year: "",
  branch: "",
  preexam: "",
  prescore: "",
  addmissionreceipt: "", //addmissionreceipt
  previousmarksheet: "", //previousmarksheet
  castcertificate: "", //castcertificate

  //contact

  email: "",
  prn: "",
  adhaar: "",
  phoneno: "",
  guardianno: "",

  //other
  username: "",
  password: "",
  hostelfeereceipt: "", //hostelfeereceipt
  vacinationcert:"", //vacinationcert
  undertaking: "", //undertaking

};

const steps = [
  { id: "personal" },
  { id: "academic" },
  { id: "contact" },
  { id: "other" },
  { id: "review" },
  { id: "submit" },
];

export default function MultiSteps() {


  const [formData, setForm] = useForm(defaultData);

  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const props = { formData, setForm, navigation };

  switch (step.id) {
    case "personal":
      return <Personal {...props} />;
    case "academic":
      return <Academic {...props} />;
    case "contact":
      return <Contact {...props} />;
    case "other":
      return <Other {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
  }

  return (
    <div>
      <h2>Multi step form</h2>
    </div>
  );
};