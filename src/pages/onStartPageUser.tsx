import { useDispatch } from "react-redux";
import { authActions } from "../store/index";

function UserStartPage(): JSX.Element {
  const dispatch = useDispatch();

  const loginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(authActions.login());
  };

  return (
    <form onSubmit={loginHandler}>
      <input type="email" placeholder="Enter email" />
      <input type="password" placeholder="Enter password" />
      <button type="button">Login</button>
    </form>
  );
}

export default UserStartPage;
