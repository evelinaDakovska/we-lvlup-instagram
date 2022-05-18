import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import styles from "./HeaderBigScreen.module.scss";

function HeaderBigScreen(): JSX.Element {
  const navigate = useNavigate();
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const userAvatar = useSelector((state: RootStateOrAny) => state.auth.avatar);

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        sx={{
          backgroundColor: "white",
          color: "black",
          position: "relative",
          width: "100%",
        }}
        position="fixed"
      >
        <Toolbar sx={{ justifyContent: "space-evenly" }}>
          <IconButton onClick={() => navigate(`/`)} sx={{ p: 0 }}>
            <img
              src={`${process.env.PUBLIC_URL} /title-img.png`}
              alt="logo"
              style={{ width: "150px" }}
            />
          </IconButton>
          <div className={styles.buttonsContainer}>
            <CameraAltIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/upload")}
            />
            <SendIcon />
            <IconButton
              onClick={() => navigate(`/profile/${userId}`)}
              sx={{ p: 0 }}
            >
              <Avatar src={userAvatar} alt="User avatar" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderBigScreen;
