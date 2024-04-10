import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// 초기값 타입 지정
interface SideMenuState {
  isSideMenuOpen: boolean;
}

// 초기값
const initialState: SideMenuState = {
  isSideMenuOpen: true,
};

// reducer 정의
export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
  },
});

export const sideMenuAction = sideMenuSlice.actions;
export const isSideMenuOpen = (state: RootState) => state.sideMenu.isSideMenuOpen;
export default sideMenuSlice.reducer;
