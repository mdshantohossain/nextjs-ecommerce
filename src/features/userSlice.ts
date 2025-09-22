import { UserType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoggedIn: boolean;
  user: UserType | null;
}

const initialState: InitialState = {} as InitialState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
