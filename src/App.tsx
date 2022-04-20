/* import { Routes } from "react-router-dom";
 */
import { RootStateOrAny, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "./App.scss";
import UserStartPage from "./pages/onStartPageUser/onStartPageUser";
import GuestStartPage from "./pages/onStartPageGuest/onStartPageGuest";
import Register from "./pages/registerPage/registerPage";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  /*   const user = false; */
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isAuth);

  return (
    <div className="App">
      <Routes>
        {isAuth ? (
          <Route path="/" element={<UserStartPage />} />
        ) : (
          <Route path="/" element={<GuestStartPage />} />
        )}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
