import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { RootStateOrAny, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserAvatar } from "utils/userSettings/userAuth";
import styles from "./HeaderBigScreen.module.scss";

function HeaderBigScreen(): JSX.Element {
  const navigate = useNavigate();
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getAvatar = async () => {
      const currentAvatar = await getUserAvatar(userId);
      setAvatar(currentAvatar);
    };
    getAvatar();
  }, []);

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
              style={{ width: "150px", height: "auto" }}
            />
          </IconButton>
          <div className={styles.buttonsContainer}>
            <CameraAltIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/upload")}
            />
            <IconButton
              onClick={() => navigate(`/profile/${userId}`)}
              sx={{ p: 0 }}
            >
              <Avatar src={avatar} alt="User avatar" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderBigScreen;
