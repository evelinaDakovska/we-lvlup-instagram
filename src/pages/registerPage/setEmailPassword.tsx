import { TextField, Button, Chip } from "@mui/material";
import { useState } from "react";
import styles from "./registerPage.module.scss";

function SetEmailPassword(props: any): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);

    props.setUserInformation({ email, password });
  }

  function validateData() {
    if (!email) {
      alert("Please Enter Email ID");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      alert("Invalid email address");
      return;
    }
    if (!password) {
      alert("Please Enter Password");
      return;
    }
    if (password.length < 6) {
      alert("Your password must contain at least 6 characters");
      return;
    }

    nextPage();
  }

  function removeDomain(domain: string) {
    const index = email.indexOf("@");
    let newValue = email;
    if (index >= 0) {
      newValue = email.slice(0, index);
    }
    newValue += domain;
    setEmail(newValue);
  }

  return (
    <form className={styles.firstPartRegister}>
      <TextField
        label="Email"
        id="emailField"
        variant="outlined"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <div className={styles.mailContainer}>
        <Chip
          label="@gmail.com"
          variant="outlined"
          onClick={() => {
            removeDomain("@gmail.com");
          }}
        />
        <Chip
          label="@abv.bg"
          variant="outlined"
          onClick={() => {
            removeDomain("@abv.bg");
          }}
        />
        <Chip
          label="@accedia.com"
          variant="outlined"
          onClick={() => {
            removeDomain("@accedia.com");
          }}
        />
      </div>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button variant="contained" onClick={validateData}>
        Next
      </Button>
    </form>
  );
}

export default SetEmailPassword;
