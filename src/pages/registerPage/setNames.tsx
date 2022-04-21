import { TextField, Button } from "@mui/material";
import { useState } from "react";

import styles from "./registerPage.module.scss";

function SetNames(props: any): JSX.Element {
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);
    props.setUserInformation({ firstName, lastName });
  }

  function validateData() {
    if (!firstName) {
      alert("Please Enter First Name");
      return;
    }
    if (!lastName) {
      alert("Please Enter Last Name");
      return;
    }

    nextPage();
  }

  return (
    <form className={styles.firstPartRegister}>
      <TextField
        id="firstName"
        label="Enter first name"
        variant="outlined"
        onChange={(event) => {
          setFName(event.target.value);
        }}
      />
      <TextField
        id="lastName"
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
