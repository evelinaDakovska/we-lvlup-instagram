/* import { Routes } from "react-router-dom";
 */
import { RootStateOrAny, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect, useEffect } from "react";
import "./App.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import ProfilePage from "./pages/profilePage/profilePage";
import DetailPage from "./pages/detailPage/detailPage";
import UserStartPage from "./pages/onStartPageUser/onStartPageUser";
import GuestStartPage from "./pages/onStartPageGuest/onStartPageGuest";
import Register from "./pages/registerPage/registerPage";
import UploadPage from "./pages/uploadPage/uploadPage";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  /*   const user = false; */
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isAuth);
  const [widthDimensions, setWidthDimensions] = useState(window.innerWidth);
  const [smallScreen, setSmallScreen] = useState(true);

  useLayoutEffect(() => {
    function handleResize() {
      setWidthDimensions(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (widthDimensions >= 768) {
      setSmallScreen(false);
    } else {
      setSmallScreen(true);
    }
  }, [widthDimensions]);

  return (
    <div className="App">
      {isAuth ? <Header /> : null}
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<UserStartPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile/:profileUserId" element={<ProfilePage />} />
            <Route path="/details/:postId" element={<DetailPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<GuestStartPage />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
      {isAuth ? smallScreen ? <Footer /> : null : null}
    </div>
  );
}

export default App;
