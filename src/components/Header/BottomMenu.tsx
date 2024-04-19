import styled from "styled-components";
import { ReactComponent as Hamburger } from "../../assets/bottomMenu/bottom-hamburger.svg";
import { ReactComponent as Board } from "../../assets/bottomMenu/bottom-board.svg";
import { ReactComponent as Home } from "../../assets/bottomMenu/bottom-home.svg";
import { ReactComponent as Commute } from "../../assets/bottomMenu/bottom-commute.svg";
import { ReactComponent as Chat } from "../../assets/bottomMenu/bottom-chat.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { sideMenuAction } from "../../redux/slice/sideMenuSlice";
import { useNavigate } from "react-router-dom";

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

interface BottomMenuProps {
  handleChatOpen: () => void;
}

export default function BottomMenu({ handleChatOpen }: BottomMenuProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <List>
      <Item>
        <Hamburger onClick={() => dispatch(sideMenuAction.toggleSideMenu())} />
      </Item>
      <Item onClick={() => navigate("/board/postlist")}>
        <Board />
      </Item>
      <Item onClick={() => navigate("/home")}>
        <Home />
      </Item>
      <Item onClick={() => navigate("/commute")}>
        <Commute />
      </Item>
      <Item onClick={handleChatOpen}>
        <Chat />
      </Item>
    </List>
  );
}
