import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

import { counterActions } from "store/counter";
import { authActions } from "store/auth";

function GuestStartPage(): JSX.Element {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootStateOrAny) => state.counter.counter);
  const show = useSelector(
    (state: RootStateOrAny) => state.counter.showCounter
  );

  const incrementHandler = (): void => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = (): void => {
    dispatch(counterActions.increase(5));
  };

  const decrementHandler = (): void => {
    dispatch(counterActions.decrement());
  };

  const toggleHandler = (): void => {
    dispatch(counterActions.toggle());
  };

  const logoutHandler = (): void => {
    dispatch(authActions.logout());
  };

  return (
    <div>
      <h1>Welcome Guest</h1>
      {show && <div>{counter}</div>}
      <button type="button" onClick={incrementHandler}>
        increment
      </button>
      <button type="button" onClick={increaseHandler}>
        increase by 5
      </button>
      <button type="button" onClick={decrementHandler}>
        decrement
      </button>
      <button type="button" onClick={toggleHandler}>
        toggle counter
      </button>
      <button type="button" onClick={logoutHandler}>
        logout
      </button>
    </div>
  );
}

export default GuestStartPage;
