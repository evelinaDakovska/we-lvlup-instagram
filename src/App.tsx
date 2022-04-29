/* import { Routes } from "react-router-dom";
 */
import { RootStateOrAny, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import ProfilePage from "pages/ProfilePage/ProfilePage";
import UserStartPage from "./pages/onStartPageUser/onStartPageUser";
import GuestStartPage from "./pages/onStartPageGuest/onStartPageGuest";
import Register from "./pages/registerPage/registerPage";
import UploadPage from "./pages/uploadPage/uploadPage";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  /*   const user = false; */
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isAuth);

  return (
    <div className="App">
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<UserStartPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile/:profileUserId" element={<ProfilePage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<GuestStartPage />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
