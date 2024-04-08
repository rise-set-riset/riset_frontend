import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { sideMenuIcon } from "./SideMenuIcons";
import { Link, useLocation } from "react-router-dom";
import SideMenuCard from "./SideMenuCard";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";

const Layout = styled.div<{ $isSideMenuOpen: boolean; $sideMenuPosition: number }>`
  position: fixed;
  left: ${(props) => props.$sideMenuPosition}px;
  top: 60px;
  z-index: 50;
  width: ${(props) => (props.$isSideMenuOpen ? "200px" : "60px")};
  height: calc(100vh - 60px);
  background-color: var(--color-white);
  border-right: 1px solid var(--color-brand-lightgray);
  transition: all 0.3s;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    width: ${(props) => (props.$isSideMenuOpen ? "200px" : "0")};
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  padding: 0 1rem 0 0.7rem;
  background-color: var(--color-gray-1);
  transition: all 0.3s;
  cursor: pointer;
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
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

interface IsMenuOpen {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  [key: string]: string;
}

interface SubMenus {
  [key: string]: string;
}

export interface Menus {
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

export default function SideMenu({ isSideMenuOpen, setIsSideMenuOpen }: IsMenuOpen) {
  const [sideMenus, setSideMenus] = useState<SlideMenus | null>(null);
  const [sideMenuPosition, setSideMenuPosition] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean[]>([]);
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useContext(ResponsiveContext);

  // 현재 보고있는 메뉴만 열리게하기
  const handleIsMenuOpen = (idx: number) => {
    setIsMenuOpen((prev) => prev.map((_, i) => (i === idx ? true : false)));
    if (isMobile) setIsSideMenuOpen(false);
  };

  // 현재 보고 있는 메뉴 확인용
  useEffect(() => {
    setIsMenuOpen(
      Array.from({ length: sideMenus?.menus.length! }, (_, idx) => {
        return sideMenus?.menus[idx].link.split("/")[1] === pathname.split("/")[1];
      })
    );
  }, [sideMenus, pathname]);

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

  // 사이드 메뉴 받아오기
  useEffect(() => {
    fetch("/data/side-menu.json")
      .then((res) => res.json())
      .then((data) => setSideMenus(data));
  }, []);

  return (
    <Layout $isSideMenuOpen={isSideMenuOpen} $sideMenuPosition={sideMenuPosition}>
      <UserProfile>
        <CustomLink to="/mypage">
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
        </CustomLink>
      </UserProfile>
      <ul>
        {sideMenus &&
          sideMenus.menus.map((menu, idx) => (
            <SideMenuCard
              key={menu.id}
              menu={menu}
              isSideMenuOpen={isSideMenuOpen}
              sideMenuIcon={sideMenuIcon}
              isMenuOpen={isMenuOpen[idx]}
              idx={idx}
              handleIsMenuOpen={handleIsMenuOpen}
            />
          ))}
      </ul>
    </Layout>
  );
}
