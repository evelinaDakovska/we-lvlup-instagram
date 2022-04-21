import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOutFunc } from "../../utils/userSettings/userAuth";

/* import { useDispatch } from "react-redux";
import { authActions } from "store/auth"; */

function UserStartPage(): JSX.Element {
  const navigate = useNavigate();

  function onSignOut() {
    navigate("/");
    signOutFunc();
  }

  return (
    <div>
      <div>Welcome</div>
      <Button variant="contained" onClick={onSignOut}>
        LogOut
      </Button>
    </div>
  );
}

export default UserStartPage;
