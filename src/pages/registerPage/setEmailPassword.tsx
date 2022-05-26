import { TextField, Button, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./registerPage.module.scss";

function SetEmailPassword(props: any): JSX.Element {
  const [email, setEmail] = useState("");
  const [alertEmail, setAlertEmail] = useState<boolean>(false);
  const [alertInvalidEmail, setAlertInvalidEmail] = useState<boolean>(false);
  const [alertPassword, setAlertPassword] = useState<boolean>(false);
  const [alertInvalidPassword, setAlertInvalidPassword] =
    useState<boolean>(false);

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.userInfo.email) {
      setEmail(props.userInfo.email);
    }
    if (props.userInfo.password) {
      setPassword(props.userInfo.password);
    }
  }, []);

  function nextPage() {
    props.onNextStep(props.navigationStep + 1);

    props.setUserInformation({ email, password });
  }

  function validateData() {
    if (!email) {
      setAlertEmail(true);
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setAlertEmail(false);
      setAlertInvalidEmail(true);
      return;
    }
    if (!password) {
      setAlertInvalidEmail(false);
      setAlertPassword(true);
      return;
    }
    if (password.length < 6) {
      setAlertInvalidPassword(true);
      setAlertPassword(false);
      return;
    }

    setAlertEmail(false);
    setAlertInvalidEmail(false);
    setAlertPassword(false);
    setAlertInvalidPassword(false);

    nextPage();
  }

  function changeDomain(domain: string) {
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
      {alertEmail ? (
        <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
          Please Enter Email ID
        </div>
      ) : null}
      {alertInvalidEmail ? (
        <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
          Invalid email address
        </div>
      ) : null}

      <div className={styles.mailContainer}>
        <Chip
          label="@gmail.com"
          variant="outlined"
          onClick={() => {
            changeDomain("@gmail.com");
          }}
        />
        <Chip
          label="@abv.bg"
          variant="outlined"
          onClick={() => {
            changeDomain("@abv.bg");
          }}
        />
        <Chip
          label="@accedia.com"
          variant="outlined"
          onClick={() => {
            changeDomain("@accedia.com");
          }}
        />
      </div>
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {alertPassword ? (
        <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
          Please Enter Password
        </div>
      ) : null}
      {alertInvalidPassword ? (
        <div style={{ backgroundColor: "#fbad50", marginTop: "1%" }}>
          Your password must contain at least 6 characters
        </div>
      ) : null}

      <Button variant="contained" onClick={validateData}>
        Next
      </Button>
    </form>
  );
}

export default SetEmailPassword;
