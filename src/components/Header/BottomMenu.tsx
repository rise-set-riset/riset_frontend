import styled from "styled-components";
import { ReactComponent as Hamburger } from "../../assets/bottomMenu/bottom-hamburger.svg";
import { ReactComponent as Board } from "../../assets/bottomMenu/bottom-board.svg";
import { ReactComponent as Home } from "../../assets/bottomMenu/bottom-home.svg";
import { ReactComponent as Commute } from "../../assets/bottomMenu/bottom-commute.svg";
import { ReactComponent as Chat } from "../../assets/bottomMenu/bottom-chat.svg";
import React from "react";

const List = styled.ul`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-brand-main);
  padding: 0 1rem;
  z-index: 100;
`;

const Item = styled.li`
  padding: 10px;
  cursor: pointer;

  svg {
    transition: all 0.5s;
  }

  &:hover > svg {
    transform: scale(1.2);
  }

  path {
    stroke: var(--color-white);
  }
`;

interface SideMenuOpen {
  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomMenu({ setIsSideMenuOpen }: SideMenuOpen) {
  return (
    <List>
      <Item>
        <Hamburger onClick={() => setIsSideMenuOpen((prev) => !prev)} />
      </Item>
      <Item>
        <Board />
      </Item>
      <Item>
        <Home />
      </Item>
      <Item>
        <Commute />
      </Item>
      <Item>
        <Chat />
      </Item>
    </List>
  );
}
