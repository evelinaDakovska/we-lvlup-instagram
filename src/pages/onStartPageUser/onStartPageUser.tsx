import { Button } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
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
      <Header />
      <div>Welcome</div>
      <Button variant="contained" onClick={onSignOut}>
        LogOut
      </Button>
      <Footer />
    </div>
  );
}

export default UserStartPage;
