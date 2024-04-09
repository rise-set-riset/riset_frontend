import { useContext } from "react";
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

export const GlobalOutletStyle = createGlobalStyle`
  main {
    max-width: 1200px;
    width: 100%;
    margin-top: 60px;
    padding-left: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-gray-1);
  }

h1 {
  background-color: var(--color-white);
  height: 4rem;
  padding: 18px 24px;
  font-size: 1.5rem;
}
`;

export default function Root() {
    const isMobile = useContext(ResponsiveContext);
    const location = useLocation();
    const isAuth = !["/", "/signup", "/authority"].includes(location.pathname);

    return (
        <>
            <GlobalOutletStyle />
            {isAuth && <Header />}
            <Outlet />
            {isAuth && <SideMenu />}
            {isMobile && isAuth && <BottomMenu />}
        </>
    );
}
