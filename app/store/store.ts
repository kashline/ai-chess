// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import chessReducer from "./chessSlice";
import userReducer from "./userSlice"

export const store = configureStore({
  reducer: {
    chess: chessReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
