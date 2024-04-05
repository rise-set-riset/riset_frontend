import styled from "styled-components";
import logoUrl from "../../assets/logo.png";
import { ReactComponent as Hamburger } from "../../assets/header/hamburger.svg";
import { ReactComponent as Moon } from "../../assets/header/moon.svg";
import { ReactComponent as Alert } from "../../assets/header/alert.svg";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";
import { useContext } from "react";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import { DarkModeContext } from "../../contexts/DarkmodeContext";
import { Link } from "react-router-dom";

const Layout = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: var(--color-white);
  z-index: 100;
  border-bottom: 1px solid var(--color-brand-lightgray);
  transition: all 0.7s;
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
  transition: all 0.5s;
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
    cursor: pointer;
  }

  svg:not(:last-child) {
    width: 25px;
    height: 25px;
    transition: all 0.5s;
    fill: var(--color-svg-fill);
    cursor: pointer;
  }

  svg:not(:last-child) > path {
    stroke: var(--color-svg-stroke);
  }

  @media screen and (max-width: 600px) {
    gap: 1rem;
    svg:last-child {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }

    svg:not(:last-child) {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;

interface IsMenuOpen {
  handleSideMenuOpen: () => void;
}

export default function Header({ handleSideMenuOpen }: IsMenuOpen) {
  const isMobile = useContext(ResponsiveContext);
  const { handleDarkmode } = useContext(DarkModeContext);

  return (
    <Layout>
      <Nav>
        {!isMobile && <HamburgerMenu onClick={handleSideMenuOpen} />}
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
  );
}
