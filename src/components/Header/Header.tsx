import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Header(): JSX.Element {
  const navigate = useNavigate();

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
        <Toolbar>
          <CameraAltIcon onClick={() => navigate("/upload")} />
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            <img
              src={`${process.env.PUBLIC_URL} /title-img.png`}
              alt="logo"
              style={{ width: "150px", height: "auto" }}
            />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
