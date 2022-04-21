import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth?: boolean;
  email: string;
  userId?: string;
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
}

const initialAuthState: Omit<AuthState, "password"> = {
  isAuth: false,
  email: "",
  userId: "",
  firstName: "",
  lastName: "",
  avatar: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, userData) {
      state.isAuth = true;
      state.email = userData.payload.email;
      state.userId = userData.payload.userId;
      state.firstName = userData.payload.firstName;
      state.lastName = userData.payload.lastName;
      state.avatar = userData.payload.avatar;
    },
    logout(state) {
      state.isAuth = false;
      state.email = "";
      state.userId = "";
      state.firstName = "";
      state.lastName = "";
      state.avatar = "";
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
