import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth?: boolean;
  email: string;
  userID?: string;
  fName: string;
  lName: string;
  avatar: string;
  password: string;
}

const initialAuthState: Omit<AuthState, "password"> = {
  isAuth: false,
  email: "",
  userID: "",
  fName: "",
  lName: "",
  avatar: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, userData) {
      state.isAuth = true;
      state.email = userData.payload.email;
      state.userID = userData.payload.userID;
      state.fName = userData.payload.fName;
      state.lName = userData.payload.lName;
      state.avatar = userData.payload.avatar;
    },
    logout(state) {
      state.isAuth = false;
      state.email = "";
      state.userID = "";
      state.fName = "";
      state.lName = "";
      state.avatar = "";
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
