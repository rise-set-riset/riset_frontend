import { useContext, useRef, useState } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { ResponsiveContext } from "../contexts/ResponsiveContext";
import BottomMenu from "../components/Header/BottomMenu";
import SideMenu from "../components/Header/SideMenu";

export default function Root() {
  const isMobile = useContext(ResponsiveContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);

  // 사이드 메뉴 열림/닫힘
  const handleSideMenuOpen = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Header handleSideMenuOpen={handleSideMenuOpen} />
      <Outlet />
      <SideMenu isSideMenuOpen={isSideMenuOpen} />
      {isMobile && <BottomMenu handleSideMenuOpen={handleSideMenuOpen} />}
    </>
  );
}
