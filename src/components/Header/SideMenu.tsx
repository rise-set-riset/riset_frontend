import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { sideMenuIcon } from "./SideMenuIcons";
import { useLocation } from "react-router-dom";

const Layout = styled.div<{ $isSideMenuOpen: boolean; $sideMenuPosition: number }>`
  position: fixed;
  left: ${(props) => props.$sideMenuPosition}px;
  top: 60px;
  z-index: 50;
  width: ${(props) => (props.$isSideMenuOpen ? "200px" : "60px")};
  height: calc(100vh - 60px);
  background-color: var(--color-white);
  border-right: 1px solid var(--color-brand-lightgray);
  transition: all 0.5s;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: ${(props) => (props.$isSideMenuOpen ? "200px" : "0")};
  }
`;

const CommonSvgStyle = css`
  cursor: pointer;

  svg {
    transition: all 0.5s;
    margin-left: 3px;
  }

  &:hover > svg {
    transform: scale(1.2);
  }

  path {
    stroke: var(--color-svg-stroke);
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1rem 1rem 0.7rem;
  background-color: var(--color-white);
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  white-space: nowrap;

  > img {
    margin-right: 1rem;
  }

  > svg {
    margin-right: 1rem;
  }
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > p:first-child {
    font-weight: bold;
  }
`;

const List = styled.ul``;

const Item = styled.li<{ $isCurrentPage: boolean }>`
  ${CommonSvgStyle}
  background-color: ${(props) =>
    props.$isCurrentPage ? "var(--color-brand-main)" : "var(--color-white)"};
  padding: 1rem;
`;

interface IsMenuOpen {
  isSideMenuOpen: boolean;
}

interface User {
  [key: string]: string;
}

interface SubMenus {
  [key: string]: string;
}

interface Menus {
  id: number;
  title: string;
  icon: string;
  link: string;
  subMenus: SubMenus[];
}

interface SlideMenus {
  user: User;
  menus: Menus[];
}

export default function SideMenu({ isSideMenuOpen }: IsMenuOpen) {
  const [sideMenus, setSideMenus] = useState<SlideMenus | null>(null);
  const [sideMenuPosition, setSideMenuPosition] = useState<number>(0);
  const location = useLocation();
  const pathname = location.pathname;

  // 사이드 메뉴 위치 조정
  useEffect(() => {
    const handleSideMenuPosition = () => {
      if (window.innerWidth > 1200) {
        setSideMenuPosition((window.innerWidth - 1200) / 2);
      } else {
        setSideMenuPosition(0);
      }
    };

    // 마운트 시 최초 1회 실행
    handleSideMenuPosition();

    window.addEventListener("resize", handleSideMenuPosition);
    return () => window.removeEventListener("resize", handleSideMenuPosition);
  }, []);

  // 사이드 메뉴들 받아오기
  useEffect(() => {
    fetch("/data/side-menu.json")
      .then((res) => res.json())
      .then((data) => setSideMenus(data));
  }, []);

  return (
    <Layout $isSideMenuOpen={isSideMenuOpen} $sideMenuPosition={sideMenuPosition}>
      <User>
        {sideMenus && (
          <>
            <Profile>
              {<UserImg src={sideMenus.user.icon} alt="profile" /> || sideMenuIcon["profile"]()}
              <UserInfo>
                <p>{sideMenus.user.name}</p>
                <p>{sideMenus.user.rank}</p>
              </UserInfo>
            </Profile>
            {sideMenuIcon["arrow"]()}
          </>
        )}
      </User>
      <List>
        {sideMenus &&
          sideMenus.menus.map((menu) => (
            <Item key={menu.id} $isCurrentPage={pathname === menu.link}>
              {sideMenuIcon[menu.icon]()}
            </Item>
          ))}
      </List>
    </Layout>
  );
}
