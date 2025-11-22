import { WishlistType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: WishlistType[] = [];

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlistItem: (state, action: PayloadAction<WishlistType>) => {
      state.push({id: uuidv4(), ...action.payload });
    },

    removeWishlistItem: (state, payload) => {
      state = state.filter((item) => item.id !== payload.payload);
    },
  },
});

export const { addWishlistItem, removeWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
