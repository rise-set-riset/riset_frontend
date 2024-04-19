import styled, { css } from "styled-components";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Menus } from "./SideMenu";
import { useContext, useState } from "react";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import { Transition } from "react-transition-group";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Item = styled.li`
  width: 200px;
  min-height: 50px;
  white-space: nowrap;
  cursor: pointer;
  svg {
    margin-left: 3px;
  }
  &:hover svg {
    transform: scale(1.2);
  }
`;

const CustomLink = styled(Link)<{ $isCurrentPage: boolean; $isDarkmode: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: bold;

  ${(props) => {
    if (props.$isDarkmode) {
      if (props.$isCurrentPage) {
        return css`
          color: var(--color-black);
          background-color: var(--color-brand-main);
          path {
            stroke: var(--color-black);
          }
        `;
      } else {
        return css`
          color: var(--color-black);
          background-color: var(--color-drakmode-white);
          path {
            stroke: var(--color-black);
          }
        `;
      }
    } else {
      if (props.$isCurrentPage) {
        return css`
          background-color: var(--color-brand-main);
          color: var(--color-white);
          path {
            stroke: var(--color-white);
          }
        `;
      }
    }
  }}
`;

const MenuWrapper = styled.div`
  width: 58px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuTitle = styled.p<{ $isSideMenuOpen: boolean }>`
  opacity: ${(props) => (props.$isSideMenuOpen ? "1" : "0")};
`;

const SubList = styled.ul<{ $isMenuOpen: boolean; $state: string; $isDarkmode: boolean }>`
  position: relative;
  transition: all 0.5s;
  ${(props) => {
    if (props.$isDarkmode) {
      if (props.$isMenuOpen) {
        return css`
          color: var(--color-black);
          background-color: var(--color-brand-orange);
          path {
            stroke: var(--color-black);
          }
        `;
      } else {
        return css`
          color: var(--color-black);
          background-color: var(--color-drakmode-white);
          path {
            stroke: var(--color-black);
          }
        `;
      }
    } else {
      if (props.$isMenuOpen) {
        return css`
          background-color: var(--color-brand-orange);
          color: var(--color-white);
          path {
            stroke: var(--color-white);
          }
        `;
      }
    }
  }}
  ${(props) => {
    switch (props.$state) {
      case "entering":
        return css`
          opacity: 1;
        `;
      case "entered":
        return css`
          opacity: 1;
        `;
      case "exiting":
        return css`
          height: 0;
          z-index: -1;
          opacity: 0;
        `;
      case "exited":
        return css`
          height: 0;
          z-index: -1;
          opacity: 0;
        `;
      default:
        return null;
    }
  }};
`;

const SubItem = styled.li<{ $isSelected: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: ${(props) => props.$isSelected && "600"};
`;

const SelectedDot = styled.div<{ $isSelected: boolean; $isDarkmode: boolean }>`
  margin: 0 25px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  ${(props) => {
    if (props.$isSelected) {
      if (props.$isDarkmode) {
        return css`
          background-color: var(--color-black);
        `;
      } else {
        return css`
          background-color: var(--color-white);
        `;
      }
    }
  }}
`;

interface Card {
  menu: Menus;
  sideMenuIcon: any;
  isMenuOpen: boolean;
  idx: number;
  handleIsMenuOpen: (idx: number) => void;
}

export default function SideMenuCard({
  menu,
  sideMenuIcon,
  isMenuOpen,
  idx,
  handleIsMenuOpen,
}: Card) {
  const naviagte = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { isMobile } = useContext(ResponsiveContext);
  const { isDarkmode } = useContext(DarkModeContext);
  const [isMenuEnter, setIsMenuEnter] = useState<boolean>(false);
  const isSideMenuOpen = useSelector((state: RootState) => state.sideMenu.isSideMenuOpen);

  // 서브 메뉴가 열리는 조건
  const isSubOpen = isMobile
    ? menu.subMenus
    : (isSideMenuOpen && menu.subMenus && isMenuOpen) ||
      (isSideMenuOpen && menu.subMenus && isMenuEnter);

  // 메뉴 경로 이동
  const handleSubClick = (link: string) => naviagte(link);

  return (
    <Item
      onClick={() => handleIsMenuOpen(idx)}
      onMouseEnter={() => setIsMenuEnter(true)}
      onMouseLeave={() => setIsMenuEnter(false)}
    >
      <CustomLink
        to={menu.link}
        $isCurrentPage={menu.link.includes(pathname.split("/")[1])}
        $isDarkmode={isDarkmode}
      >
        <MenuWrapper>{sideMenuIcon[menu.icon]()}</MenuWrapper>
        <MenuTitle $isSideMenuOpen={isSideMenuOpen}>{menu.title}</MenuTitle>
      </CustomLink>
      <Transition in={Boolean(isSubOpen)} timeout={300} unmountOnExit mountOnEnter>
        {(state) => (
          <SubList $isMenuOpen={isMenuOpen} $state={state} $isDarkmode={isDarkmode}>
            {menu.subMenus?.map((sub) => (
              <SubItem
                key={sub.id}
                onClick={() => handleSubClick(sub.link)}
                $isSelected={sub.link.includes(pathname.split("/")[2])}
              >
                <SelectedDot
                  $isSelected={sub.link.includes(pathname.split("/")[2])}
                  $isDarkmode={isDarkmode}
                />
                <span>{sub.title}</span>
              </SubItem>
            ))}
          </SubList>
        )}
      </Transition>
    </Item>
  );
}
