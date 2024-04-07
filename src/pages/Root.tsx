import { useContext, useState } from "react";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ResponsiveContext } from "../contexts/ResponsiveContext";
import BottomMenu from "../components/Header/BottomMenu";
import SideMenu from "../components/Header/SideMenu";

export default function Root() {
  const isMobile = useContext(ResponsiveContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const location = useLocation();
  const isAuth = !["/", "/signup", "/authority"].includes(location.pathname);

  return (
    <>
      {isAuth && <Header setIsSideMenuOpen={setIsSideMenuOpen} />}
      <Outlet />
      {isAuth && <SideMenu isSideMenuOpen={isSideMenuOpen} />}
      {isMobile && isAuth && <BottomMenu setIsSideMenuOpen={setIsSideMenuOpen} />}
    </>
  );
}