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
      <Button variant="contained" type="submit" onClick={nextPage}>
        Next
      </Button>
    </form>
  );
}

export default SetNames;
