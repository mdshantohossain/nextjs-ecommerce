import { CartType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartType = {
  cartTotal: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItem: (state, action) => {
      state.cartTotal += Number(action.payload.selling_price);
      state.items.push({
        id: action.payload.id,
        name: action.payload.name,
        price: Number(action.payload.selling_price),
        image: action.payload.main_image,
        quantity: 1,
      });
    },
    updateCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        const newPrice = Number(action.payload.price);
        const oldPrice = Number(state.items[index].price);
        state.cartTotal = state.cartTotal - oldPrice + newPrice;
        state.items[index] = { ...action.payload, price: newPrice };
      }
    },
    removeCartItem: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.cartTotal -= Number(itemToRemove.price);
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addToCartItem, updateCart, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;

export const isProductExists = (state: CartType, id: string | number) =>
  state.items.some((item) => item.id === id);
