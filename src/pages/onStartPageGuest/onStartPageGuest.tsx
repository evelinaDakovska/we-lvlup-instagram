/* import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

import { counterActions } from "store/counter";
import { authActions } from "store/auth"; */
import { useState } from "react";
import { Button, Divider, TextField, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  signIn,
  signInGoogle,
  signInFacebook,
} from "../../utils/userSettings/userAuth";
import styles from "./onStartPageGuest.module.scss";

function GuestStartPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertEmail, setAlertEmail] = useState<boolean>(false);
  const [alertPassword, setAlertPassword] = useState<boolean>(false);

  function loginFunc() {
    if (!email) {
      setAlertEmail(true);
      return;
    }
    if (!password) {
      setAlertEmail(false);
      setAlertPassword(true);
      return;
    }
    setAlertEmail(false);
    setAlertPassword(false);

    signIn(email, password);
  }

  return (
    <div className={styles.loginContainer}>
      <img
        src={`${process.env.PUBLIC_URL} /title-img.png`}
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.alternativeLogin}>
        <Button
          variant="contained"
          onClick={signInFacebook}
          startIcon={<FacebookIcon className={styles.icons} />}
        >
          Continue with Facebook
        </Button>
        <Button
          variant="contained"
          onClick={signInGoogle}
          startIcon={<GoogleIcon className={styles.icons} />}
        >
          Continue with Google
        </Button>
      </div>
      <Divider className={styles.orDivider}>or</Divider>
      <form action="" className={styles.loginForm}>
        <TextField
          label="Username"
          sx={{ padding: "0" }}
          margin="dense"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {alertEmail ? (
          <div style={{ color: "red" }}>Please Enter Email</div>
        ) : null}
        <TextField
          label="Password"
          margin="dense"
          type="password"
          sx={{ padding: "0" }}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {alertPassword ? (
          <div style={{ color: "red" }}>Please Enter Password</div>
        ) : null}
        <Button variant="contained" onClick={loginFunc}>
          Log In
        </Button>
      </form>
      <div className={styles.signUp}>
        Don&apos;t have an account?{" "}
        <Link href="/register" underline="hover">
          Sign up{" "}
        </Link>
      </div>
    </div>
  );
}

export default GuestStartPage;
