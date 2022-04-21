import { TextField, Button } from "@mui/material";
import { useState } from "react";

import styles from "./registerPage.module.scss";

function SetNames(props: any): JSX.Element {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);
    props.setUserInformation({ fName, lName });
  }

  function validateData() {
    if (!fName) {
      alert("Please Enter First Name");
      return;
    }
    if (!lName) {
      alert("Please Enter Last Name");
      return;
    }

    nextPage();
  }

  return (
    <form className={styles.firstPartRegister}>
      <TextField
        id="fName"
        label="Enter first name"
        variant="outlined"
        onChange={(event) => {
          setFName(event.target.value);
        }}
      />
      <TextField
        id="lName"
        label="Enter last name"
        variant="outlined"
        onChange={(event) => {
          setLName(event.target.value);
        }}
      />
      <Button variant="contained" onClick={validateData}>
        Next
      </Button>
    </form>
  );
}

export default SetNames;
