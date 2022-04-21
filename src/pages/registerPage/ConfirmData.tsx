import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { signUp } from "../../utils/userSettings/userAuth";

function ConfirmData(props: any): JSX.Element {
  const navigate = useNavigate();
  function confirmData() {
    console.log("confirmed");
    const userData = { ...props.userInfo };
    navigate("/");
    signUp(userData);
  }

  return (
    <div>
      <div>Email: {props.userInfo.email}</div>
      <div>First name: {props.userInfo.fName}</div>
      <div>Last name: {props.userInfo.lName}</div>
      <Button variant="contained" type="submit" onClick={confirmData}>
        Confirm
      </Button>
    </div>
  );
}

export default ConfirmData;
