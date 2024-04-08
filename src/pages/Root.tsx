import { useContext, useState } from "react";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ResponsiveContext } from "../contexts/ResponsiveContext";
import BottomMenu from "../components/Header/BottomMenu";
import SideMenu from "../components/Header/SideMenu";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  svg {
    transition: all 0.3s;
    cursor: pointer;
  }

  li:hover svg,
  span:hover svg,
  svg:hover {
    transform: scale(1.2);
  }

  path {
    transition: all 0.3s;
    stroke: var(--color-svg-stroke);
  }
`;

export default function Root() {
  const isMobile = useContext(ResponsiveContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(true);
  const location = useLocation();
  const isAuth = !["/", "/signup", "/authority"].includes(location.pathname);

  return (
    <>
      {isAuth && <Header setIsSideMenuOpen={setIsSideMenuOpen} />}
      <Outlet />
      {isAuth && <SideMenu isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />}
      {isMobile && isAuth && <BottomMenu setIsSideMenuOpen={setIsSideMenuOpen} />}
    </>
  );
}
