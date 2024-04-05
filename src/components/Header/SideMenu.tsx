import { useEffect, useState } from "react";
import styled from "styled-components";

const Layout = styled.div<{ $isSideMenuOpen: boolean }>`
  position: fixed;
  left: 0;
  z-index: 50;
  width: 300px;
  height: 100%;
  transform: ${(props) =>
    props.$isSideMenuOpen ? "translateX(0)" : "translateX(calc(-100% + 60px))"};
  background-color: var(--color-white);
  border-right: 1px solid var(--color-brand-lightgray);
  transition: all 0.7s;

  @media screen and (max-width: 600px) {
    transform: ${(props) => (props.$isSideMenuOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

interface IsMenuOpen {
  isSideMenuOpen: boolean;
}

interface User {
  imgUrl: string;
  name: string;
  rank: string;
}

interface SubMenus {
  title: string;
  imgUrl: string;
  link: string;
}

interface Menus {
  title: string;
  imgUrl: string;
  link: string;
  subMenus: SubMenus[];
}

interface SlideMenus {
  user: User;
  menus: Menus[];
}

export default function SideMenu({ isSideMenuOpen }: IsMenuOpen) {
  const [sideMenus, setSideMenus] = useState<SlideMenus | null>(null);

  useEffect(() => {
    fetch("/data/side-menu.json")
      .then((res) => res.json())
      .then((data) => setSideMenus(data));
  }, []);

  return <Layout $isSideMenuOpen={isSideMenuOpen}>{sideMenus && <></>}</Layout>;
}
