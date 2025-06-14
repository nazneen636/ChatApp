import { configureStore } from "@reduxjs/toolkit";
import friendReducer from "../Features/Slices/friendSlice";
export const store = configureStore({
  reducer: { friend: friendReducer },
});
