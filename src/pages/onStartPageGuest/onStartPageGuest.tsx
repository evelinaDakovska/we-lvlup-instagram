/* import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

import { counterActions } from "store/counter";
import { authActions } from "store/auth"; */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, TextField, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "../../utils/userSettings/userAuth";
import styles from "./onStartPageGuest.module.scss";

function GuestStartPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function loginFunc() {
    signIn(email, password);
    navigate("/");
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
          startIcon={<FacebookIcon className={styles.icons} />}
        >
          Continue with Facebook
        </Button>
        <Button
          variant="contained"
          startIcon={<GoogleIcon className={styles.icons} />}
        >
          Continue with Google
        </Button>
      </div>
      <Divider className={styles.orDivider}>or</Divider>
      <form action="" className={styles.loginForm}>
        <TextField
          label="Username"
          margin="dense"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          label="Password"
          margin="dense"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Link
          href="/"
          underline="hover"
          sx={{ marginTop: "5%", paddingLeft: "50%" }}
        >
          Forgot password?
        </Link>
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
