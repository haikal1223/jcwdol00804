import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";

export const globalStore = configureStore({
  reducer: {
    userReducer,
  },
});
