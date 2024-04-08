import React, { useContext } from "react";
import styled from "styled-components";
import logoUrl from "../../assets/logo.png";
import { ReactComponent as Hamburger } from "../../assets/header/hamburger.svg";
import { ReactComponent as Moon } from "../../assets/header/moon.svg";
import { ReactComponent as Alert } from "../../assets/header/alert.svg";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import { DarkModeContext } from "../../contexts/DarkmodeContext";
import { Link } from "react-router-dom";
import { GlobalStyle } from "../../pages/Root";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { sideMenuAction } from "../../redux/slice/sideMenuSlice";

const Layout = styled.header`
  position: fixed;
  width: 100vw;
  height: 60px;
  background-color: var(--color-white);
  z-index: 100;
  border-bottom: 1px solid var(--color-brand-lightgray);
  transition: background-color 0.3s;
  box-shadow: 0px 3px 30px -20px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 3px 30px -20px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 30px -20px rgba(0, 0, 0, 0.75);
`;

const Nav = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0 1rem;
`;

const HamburgerMenu = styled(Hamburger)`
  cursor: pointer;
  path {
    stroke: var(--color-svg-stroke);
  }
`;

const LogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  @media screen and (max-width: 600px) {
    position: static;
    transform: translate(0, 0);
  }
`;

const Utils = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  svg:last-child {
    width: 35px;
    height: 35px;
  }
  svg:not(:last-child) {
    width: 25px;
    height: 25px;
    fill: var(--color-svg-fill);
  }
  svg:not(:last-child) > path {
    stroke: var(--color-svg-stroke);
  }

  @media screen and (max-width: 600px) {
    gap: 1rem;
    svg:last-child {
      width: 25px;
      height: 25px;
    }
    svg:not(:last-child) {
      width: 20px;
      height: 20px;
    }
  }
`;

export default function Header() {
  const isMobile = useContext(ResponsiveContext);
  const { handleDarkmode } = useContext(DarkModeContext);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Nav>
          {!isMobile && <HamburgerMenu onClick={() => dispatch(sideMenuAction.toggleSideMenu())} />}
          <Link to="/home">
            <LogoImg src={logoUrl} alt="riset" />
          </Link>
          <Utils>
            <Moon onClick={handleDarkmode} />
            <Alert />
            <Link to="/mypage">
              <Profile />
            </Link>
          </Utils>
        </Nav>
      </Layout>
    </>
  );
}
