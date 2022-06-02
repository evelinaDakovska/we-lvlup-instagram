import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { signUp } from "../../utils/userSettings/userAuth";
import styles from "./registerPage.module.scss";

function ConfirmData(props: any): JSX.Element {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function confirmData() {
    const userData = { ...props.userInfo };
    setIsLoading(true);
    function mycallback() {
      navigate("/");
    }
    if (props.uploadedAvatar) {
      await signUp(userData, props.uploadedAvatar, mycallback);
    } else {
      await signUp(userData, undefined, mycallback);
    }
  }

  return (
    <div className={styles.verifyContainer}>
      <div>Email: {props.userInfo.email}</div>
      <div>First name: {props.userInfo.firstName}</div>
      <div>Last name: {props.userInfo.lastName}</div>
      <div className={styles.avatarContainer}>
        Avatar:
        <img
          className={styles.avatarPrev}
          src={props.userInfo.avatar}
          alt="avatar"
        />
      </div>
      {!isLoading ? (
        <Button variant="contained" type="submit" onClick={confirmData}>
          Confirm
        </Button>
      ) : (
        <div style={{ marginTop: "2%" }}>
          <span className={styles.loader} />{" "}
        </div>
      )}
    </div>
  );
}

export default ConfirmData;
