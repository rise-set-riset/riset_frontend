import { configureStore } from "@reduxjs/toolkit";
import { sideMenuSlice } from "../slice/sideMenuSlice";

export const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
