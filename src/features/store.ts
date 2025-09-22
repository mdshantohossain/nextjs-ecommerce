import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cartSlice";
import categoryReducer from "@/features/categorySlice";
import productReducer from "@/features/productSlice";
import appReducer from "@/features/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
