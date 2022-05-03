import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { signUp } from "../../utils/userSettings/userAuth";
import styles from "./registerPage.module.scss";

function ConfirmData(props: any): JSX.Element {
  const navigate = useNavigate();
  function confirmData() {
    const userData = { ...props.userInfo };
    navigate("/");

    if (props.uploadedAvatar) {
      signUp(userData, props.uploadedAvatar);
    } else {
      signUp(userData, undefined);
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
      <Button variant="contained" type="submit" onClick={confirmData}>
        Confirm
      </Button>
    </div>
  );
}

export default ConfirmData;
