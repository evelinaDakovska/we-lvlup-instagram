import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Header.module.scss";

function Header(): JSX.Element {
  return (
    <div className={styles.headerContainer}>
      <div>
        <CameraAltIcon />
      </div>
      <div>Instagram</div>
      <div>
        <SendIcon />
      </div>
    </div>
  );
}

export default Header;
