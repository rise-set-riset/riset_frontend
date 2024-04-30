import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import logoUrl from "../../assets/logo.png";
import logoDarkmodeUrl from "../../assets/logo-darkmode.png";
import { ReactComponent as Hamburger } from "../../assets/header/hamburger.svg";
import { ReactComponent as Moon } from "../../assets/header/moon.svg";
import { ReactComponent as Alert } from "../../assets/header/alert.svg";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import { DarkModeContext } from "../../contexts/DarkmodeContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { sideMenuAction } from "../../redux/slice/sideMenuSlice";

const Layout = styled.header`
  position: fixed;
  width: 100vw;
  height: 60px;
  background-color: var(--color-drakmode-white);
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
    stroke: var(--color-svg-stroke);
  }
`;

const LogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110px;
  height: 35px;
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

const ProfileMenu = styled.div`
  position: relative;
`;

// fadeIn 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const DropdownMenu = styled.ul`
  z-index: 5000;
  position: absolute;
  top: 60px;
  right: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
  animation: ${fadeIn} 0.3s ease-in-out;

  li {
    padding: 1rem 4rem;
    font-size: 1rem;
    font-weight: 500;
  }

  li:nth-child(1) {
    padding-left: 1rem;
    width: 100%;
    background-color: var(--color-brand-yellow);
    text-align: left;
    span {
      font-weight: bold;
      margin-right: 0.5rem;
    }
  }

  li:nth-child(2) {
    border-bottom: 1px solid var(--color-gray-2);
  }

  li:nth-child(2),
  li:nth-child(3) {
    cursor: pointer;
    &:hover {
      color: var(--color-brand-main);
    }
  }
`;

export default function Header() {
  const { isMobile } = useContext(ResponsiveContext);
  const { handleDarkmode } = useContext(DarkModeContext);
  const dispatch = useDispatch<AppDispatch>();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const jwt = localStorage.getItem("jwt");
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState<string>("");
  const { isDarkmode } = useContext(DarkModeContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    // fetch("https://dev.risetconstruction.net/preset", {
    fetch("http://13.124.235.23:8080/preset", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
        setUserImg(data.myImage);
      });
  }, []);

  return (
    <>
      <Layout>
        <Nav>
          {!isMobile && (
            <HamburgerMenu
              onClick={() => dispatch(sideMenuAction.toggleSideMenu())}
            />
          )}
          <Link to="/home">
            <LogoImg src={isDarkmode ? logoDarkmodeUrl : logoUrl} alt="riset" />
          </Link>
          <Utils>
            <Moon onClick={handleDarkmode} />
            <Alert />
            <ProfileMenu
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              {/* {userImg ? <img src={userImg} alt="user" /> : <Profile />} */}
              <img
                src="/sample.png"
                alt="user"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </ProfileMenu>
            {isProfileMenuOpen && (
              <DropdownMenu>
                <li>
                  <span>{userName}</span>님
                </li>
                <li onClick={() => navigate("/mypage")}>마이페이지</li>
                <li onClick={handleLogout}>로그아웃</li>
              </DropdownMenu>
            )}
          </Utils>
        </Nav>
      </Layout>
    </>
  );
}
