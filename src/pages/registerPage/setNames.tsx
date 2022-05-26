import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

import styles from "./registerPage.module.scss";

function SetNames(props: any): JSX.Element {
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [alertFN, setAlertFN] = useState<boolean>(false);
  const [alertLN, setAlertLN] = useState<boolean>(false);

  useEffect(() => {
    if (props.userInfo.firstName) {
      setFName(props.userInfo.firstName);
    }
    if (props.userInfo.lastName) {
      setLName(props.userInfo.lastName);
    }
  }, []);

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);
    props.setUserInformation({ firstName, lastName });
  }

  function validateData() {
    if (!firstName) {
      setAlertFN(true);
      return;
    }
    if (!lastName) {
      setAlertFN(false);
      setAlertLN(true);
      return;
    }
    setAlertFN(false);
    setAlertLN(false);
    nextPage();
  }

  return (
    <form className={styles.firstPartRegister}>
      <TextField
        id="firstName"
        label="Enter first name"
        value={firstName}
        variant="outlined"
        onChange={(event) => {
          setFName(event.target.value);
        }}
      />
      {alertFN ? (
        <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
          Please Enter First Name
        </div>
      ) : null}
      <TextField
        id="lastName"
        label="Enter last name"
        value={lastName}
        variant="outlined"
        onChange={(event) => {
          setLName(event.target.value);
        }}
      />
      {alertLN ? (
        <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
          Please Enter Last Name
        </div>
      ) : null}
      <Button variant="contained" onClick={validateData}>
        Next
      </Button>
    </form>
  );
}

export default SetNames;
