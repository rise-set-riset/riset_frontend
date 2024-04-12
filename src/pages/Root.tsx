import { useContext } from "react";
import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ResponsiveContext } from "../contexts/ResponsiveContext";
import BottomMenu from "../components/Header/BottomMenu";
import SideMenu from "../components/Header/SideMenu";
import { createGlobalStyle } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const GlobalSvgStyle = createGlobalStyle`
  svg {
    transition: all 0.3s;
    cursor: pointer;
  }

  span:hover svg,
  svg:hover {
    transform: scale(1.2);
  }
  
  path {
    transition: all 0.3s;
    stroke: var(--color-svg-stroke);
  }
`;

const GlobalOutletStyle = createGlobalStyle<{ $sideOpenState: string }>`
  * {
    transition: background-color 0.3s;
  }
  .main {
    min-height: calc(100vh - 60px);
    height: calc(100% - 60px);
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-gray-1);
    transition: width 0.3s;
    padding-bottom: 60px;
    width: ${(props) => {
      switch (props.$sideOpenState) {
        case "mobile":
          return "100%";
        case "pcOpen":
          return "calc(100% - 200px)";
        case "pcClose":
          return "calc(100% - 60px)";
        default:
          return null;
      }
    }}
  }
  .title {
    height: 4rem;
    padding: 18px 24px;
    background-color: var(--color-white);
    color: var(--color-black);

    @media screen and (max-width: 430px) {
            font-size: 1.2rem;
            height: 3rem;
            padding: 14px 20px;
        }
  }
`;

type SideOpenState = "mobile" | "pcOpen" | "pcClose";

export default function Root() {
  const isMobile = useContext(ResponsiveContext);
  const location = useLocation();
  const isAuth = !["/", "/signup", "/authority", "/findid", "/findpassword"].includes(
    location.pathname
  );
  const isSideMenuOpen = useSelector((state: RootState) => state.sideMenu.isSideMenuOpen);
  const sideOpenState: SideOpenState = isMobile ? "mobile" : isSideMenuOpen ? "pcOpen" : "pcClose";

  return (
    <>
      <GlobalOutletStyle $sideOpenState={sideOpenState} />
      <GlobalSvgStyle />
      {isAuth && <Header />}
      <Outlet />
      {isAuth && <SideMenu />}
      {isMobile && isAuth && <BottomMenu />}
    </>
  );
}
