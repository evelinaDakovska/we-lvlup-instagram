import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import { signOutFunc } from "../../utils/userSettings/userAuth";
import styles from "./profilePage.module.scss";

function ProfilePage(): JSX.Element {
  const navigate = useNavigate();

  function onSignOut() {
    navigate("/");
    signOutFunc();
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div>Welcome</div>
      <Button variant="contained" onClick={onSignOut}>
        LogOut
      </Button>
      <Footer />
    </div>
  );
}

export default ProfilePage;
