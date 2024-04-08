import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { Menus } from "./SideMenu";
import { useContext, useRef, useState } from "react";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";
import { Transition } from "react-transition-group";

const Item = styled.li`
  width: 200px;
  min-height: 50px;
  white-space: nowrap;
  cursor: pointer;

  svg {
    margin-left: 3px;
  }
`;

const CustomLink = styled(Link)<{ $isCurrentPage: boolean }>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  color: ${(props) => (props.$isCurrentPage ? "var(--color-white)" : "var(--color-black)")};
  background-color: ${(props) =>
    props.$isCurrentPage ? "var(--color-brand-main)" : "var(--color-white)"};
  path {
    stroke: ${(props) => (props.$isCurrentPage ? "var(--color-white)" : "var(--color-black)")};
  }
  p {
    margin-left: 5px;
  }
`;

const MenuWrapper = styled.div`
  width: 58px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
  margin-left: 63px;
  list-style: disc;
`;

const SubItem = styled.li<{ $isSelected: boolean }>`
  font-weight: ${(props) => props.$isSelected && "bold"};
`;

interface Card {
  menu: Menus;
  isSideMenuOpen: boolean;
  sideMenuIcon: any;
  isMenuOpen: boolean;
  idx: number;
  handleIsMenuOpen: (idx: number) => void;
}

export default function SideMenuCard({
  menu,
  isSideMenuOpen,
  sideMenuIcon,
  isMenuOpen,
  idx,
  handleIsMenuOpen,
}: Card) {
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = useContext(ResponsiveContext);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);
  const isSubOpen =
    (isSideMenuOpen && isMenuOpen && menu.subMenus) ||
    (isSideMenuOpen && isSubMenuOpen && menu.subMenus);
  const subRef = useRef<HTMLUListElement | null>(null);

  return (
    <Item
      onClick={() => handleIsMenuOpen(idx)}
      onMouseEnter={() => setIsSubMenuOpen(true)}
      onMouseLeave={() => setIsSubMenuOpen(false)}
    >
      <CustomLink to={menu.link} $isCurrentPage={menu.link.includes(pathname.split("/")[1])}>
        <MenuWrapper>{sideMenuIcon[menu.icon]()}</MenuWrapper>
        <p>{menu.title}</p>
      </CustomLink>
      {/* <Transition nodeRef={subRef} in={isMobile ? menu.subMenus : isSubOpen} timeout={500}> */}
      {isMobile
        ? menu.subMenus && (
            <SubList>
              {menu.subMenus?.map((sub) => (
                <SubItem key={sub.id} $isSelected={sub.link.includes(pathname.split("/")[2])}>
                  <Link to={sub.link}>{sub.title}</Link>
                </SubItem>
              ))}
            </SubList>
          )
        : isSubOpen && (
            <SubList>
              {menu.subMenus?.map((sub) => (
                <SubItem key={sub.id} $isSelected={sub.link.includes(pathname.split("/")[2])}>
                  <Link to={sub.link}>{sub.title}</Link>
                </SubItem>
              ))}
            </SubList>
          )}
      {/* </Transition> */}
    </Item>
  );
}
