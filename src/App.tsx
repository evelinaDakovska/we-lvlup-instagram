/* import { Routes } from "react-router-dom";
 */
import { RootStateOrAny, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useState, useLayoutEffect, useEffect, lazy, Suspense } from "react";
import "./App.scss";

const Header = lazy(() => import("components/Header/Header"));
const Footer = lazy(() => import("components/Footer/Footer"));
const HeaderBigScreen = lazy(() => import("components/Header/HeaderBigScreen"));
const ProfilePage = lazy(() => import("./pages/profilePage/profilePage"));
const DetailPage = lazy(() => import("./pages/detailPage/detailPage"));
const UserStartPage = lazy(
  () => import("./pages/onStartPageUser/onStartPageUser")
);
const GuestStartPage = lazy(
  () => import("./pages/onStartPageGuest/onStartPageGuest")
);
const Register = lazy(() => import("./pages/registerPage/registerPage"));
const UploadPage = lazy(() => import("./pages/uploadPage/uploadPage"));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
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
      <Suspense fallback={<div>Loading...</div>}>
        {isAuth ? smallScreen ? <Header /> : <HeaderBigScreen /> : null}
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
      </Suspense>
    </div>
  );
}

export default App;
