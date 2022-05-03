/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";
import { loadState, saveState } from "./localStorage";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState({ auth: store.getState().auth });
});

export const { dispatch } = store;
export default store;
