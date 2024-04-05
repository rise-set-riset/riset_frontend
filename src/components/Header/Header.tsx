import styled from "styled-components";
import logoUrl from "../../assets/logo.png";
import { ReactComponent as Hamburger } from "../../assets/header/hamburger.svg";
import { ReactComponent as Darkmode } from "../../assets/header/darkmode.svg";
import { ReactComponent as Alert } from "../../assets/header/alert.svg";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";
import { useContext } from "react";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";

const Layout = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: var(--color-white);
  z-index: 100;
  border-bottom: 1px solid var(--color-brand-lightgray);
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
    stroke: var(--color-black);
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
  svg {
    cursor: pointer;
  }
  @media screen and (max-width: 600px) {
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

const ProfileImg = styled(Profile)`
  margin-left: 0.4rem;
`;

export default function Header() {
  const isMobile = useContext(ResponsiveContext);

  return (
    <Layout>
      <Nav>
        {!isMobile && <HamburgerMenu />}
        <LogoImg src={logoUrl} alt="riset" />
        <Utils>
          <Darkmode />
          <Alert />
          <ProfileImg />
        </Utils>
      </Nav>
    </Layout>
  );
}
