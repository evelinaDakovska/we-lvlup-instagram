/* import { Routes } from "react-router-dom";
 */
import { RootStateOrAny, useSelector } from "react-redux";
import "./App.css";
import UserStartPage from "./pages/onStartPageUser";
import GuestStartPage from "./pages/onStartPageGuest";
/* import Button from '@mui/material/Button' */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  /*   const user = false; */
  const isAuth = useSelector((state: RootStateOrAny) => state.auth.isAuth);

  return (
    <div className="App">
      <h1>Welcome to Instagram!</h1>

      {!isAuth && <UserStartPage />}
      {isAuth && <GuestStartPage />}
    </div>
  );
}

export default App;
