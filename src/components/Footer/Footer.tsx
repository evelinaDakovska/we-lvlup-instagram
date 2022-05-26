import AppBar from "@mui/material/AppBar/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import CottageIcon from "@mui/icons-material/Cottage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Avatar from "@mui/material/Avatar";
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserAvatar } from "utils/userSettings/userAuth";

function Footer(): JSX.Element {
  const userId = useSelector((state: RootStateOrAny) => state.auth.userId);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAvatar = async () => {
      const currentAvatar = await getUserAvatar(userId);
      setAvatar(currentAvatar);
    };
    getAvatar();
  }, []);

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, backgroundColor: "#ffffff" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton onClick={() => navigate("/")}>
          <CottageIcon fontSize="medium" sx={{ color: "#000000" }} />
        </IconButton>
        <IconButton>
          <SearchIcon fontSize="medium" sx={{ color: "#000000" }} />
        </IconButton>
        <IconButton onClick={() => navigate("/upload")}>
          <AddCircleOutlineIcon fontSize="medium" sx={{ color: "#000000" }} />
        </IconButton>
        <IconButton>
          <FavoriteBorderIcon fontSize="medium" sx={{ color: "#000000" }} />
        </IconButton>
        <IconButton
          onClick={() => navigate(`/profile/${userId}`)}
          sx={{ p: 0 }}
        >
          <Avatar src={avatar} alt="User avatar" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
