import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  address: string;
  city: string;
  state: string;
  country: string;
} = {
  address: "",
  city: "",
  state: "",
  country: "",
};

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState,
  reducers: {
    addcurrentLocation: (state, action) => {
      state.address = action.payload.address;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.country = action.payload.country;
    },
  },
});

export const { addcurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
