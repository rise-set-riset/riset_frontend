import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { sideMenuIcon } from "./SideMenuIcons";
import { Link, useLocation } from "react-router-dom";
import SideMenuCard from "./SideMenuCard";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { sideMenuAction } from "../../redux/slice/sideMenuSlice";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Layout = styled.div<{
  $isSideMenuOpen: boolean;
  $sideMenuPosition: number;
}>`
  position: fixed;
  left: ${(props) => props.$sideMenuPosition}px;
  top: 60px;
  z-index: 50;
  width: ${(props) => (props.$isSideMenuOpen ? "200px" : "60px")};
  height: calc(100vh - 60px);
  background-color: var(--color-drakmode-white);
  border-right: 1px solid var(--color-brand-lightgray);
  transition: background-color 0.3s, width 0.3s;
  overflow: auto;
  overflow-x: hidden;

  @media screen and (max-width: 599px) {
    width: ${(props) => (props.$isSideMenuOpen ? "200px" : "0")};
    height: calc(100vh - 120px);
    padding-bottom: 200px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  padding: 0 1rem 0 0.7rem;
  background-color: var(--color-gray-1);
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

export default function SideMenu() {
  const [sideMenus, setSideMenus] = useState<SlideMenus | null>(null);
  const [sideMenuPosition, setSideMenuPosition] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean[]>([]);
  const location = useLocation();
  const pathname = location.pathname;
  const { isMobile } = useContext(ResponsiveContext);
  const dispatch = useDispatch<AppDispatch>();
  const isSideMenuOpen = useSelector((state: RootState) => state.sideMenu.isSideMenuOpen);

  // 현재 보고있는 메뉴만 열리게하기
  const handleIsMenuOpen = (idx: number) => {
    setIsMenuOpen((prev) => prev.map((_, i) => (i === idx ? true : false)));
    if (isMobile) dispatch(sideMenuAction.toggleSideMenu());
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
    const fetchMenus = async () => {
      try {
        fetch("https://dev.risetconstruction.net/api/menus")
          .then((res) => res.json())
          .then((data) => setSideMenus(data));
      } catch (err: any) {
        fetch("/data/side-menu.json")
          .then((res) => res.json())
          .then((data) => setSideMenus(data));
      }
    };

    fetchMenus();
  }, []);

  return (
    <Layout $isSideMenuOpen={isSideMenuOpen} $sideMenuPosition={sideMenuPosition}>
      <UserProfile>
        <CustomLink to="/mypage">
          {sideMenus && (
            <>
              <Profile>
                {sideMenus.user.icon ? (
                  <UserImg src={sideMenus.user.icon} alt="profile" />
                ) : (
                  sideMenuIcon["profile"]()
                )}
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
