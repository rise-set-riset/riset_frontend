import styled from "styled-components";
import { ReactComponent as Hamburger } from "../../assets/bottomMenu/bottom-hamburger.svg";
import { ReactComponent as Board } from "../../assets/bottomMenu/bottom-board.svg";
import { ReactComponent as Home } from "../../assets/bottomMenu/bottom-home.svg";
import { ReactComponent as Commute } from "../../assets/bottomMenu/bottom-commute.svg";
import { ReactComponent as Chat } from "../../assets/bottomMenu/bottom-chat.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { sideMenuAction } from "../../redux/slice/sideMenuSlice";

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
  path {
    stroke: var(--color-white);
  }
`;

export default function BottomMenu() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <List>
      <Item>
        <Hamburger onClick={() => dispatch(sideMenuAction.toggleSideMenu())} />
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
