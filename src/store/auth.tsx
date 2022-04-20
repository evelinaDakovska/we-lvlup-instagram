import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: false,
  email: "",
  uid: "",
  fName: "",
  lName: "",
  avatar: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(
      state,
      {
        payload: { email, uid, fName, lName, avatar },
      }: PayloadAction<{
        email: string;
        uid: string;
        fName: string;
        lName: string;
        avatar: "";
      }>
    ) {
      state.isAuth = true;
      state.email = email;
      state.uid = uid;
      state.fName = fName;
      state.lName = lName;
      state.avatar = avatar;
    },
    logout(state) {
      state.isAuth = false;
      state.email = "";
      state.uid = "";
      state.fName = "";
      state.lName = "";
      state.avatar = "";
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
