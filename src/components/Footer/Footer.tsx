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

function Footer(): JSX.Element {
  const userAvatar = useSelector((state: RootStateOrAny) => state.auth.avatar);
  const navigate = useNavigate();

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
        <IconButton onClick={() => navigate("/profile")} sx={{ p: 0 }}>
          <Avatar src={userAvatar} alt="User avatar" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
