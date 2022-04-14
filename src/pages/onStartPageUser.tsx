import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function UserStartPage(): JSX.Element {
  const dispatch = useDispatch();

  const loginHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    dispatch(authActions.login());
  };

  return (
    <form>
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />
      <button type="button" onClick={loginHandler}>
        Login
      </button>
    </form>
  );
}

export default UserStartPage;
