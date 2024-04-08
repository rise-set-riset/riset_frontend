import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store/store";

const Layout = styled.main<{ $isSideMenuOpen: boolean }>`
  width: ${(props) => (props.$isSideMenuOpen ? "calc(100% - 60px)" : "100%")};
  height: 100%;
  margin-top: 60px;
  border: 2px solid black;
`;

export default function Commute() {
  const isSideMenuOpen = useSelector((state: RootState) => state.sideMenu.isSideMenuOpen);

  return <Layout $isSideMenuOpen={isSideMenuOpen}>Commute</Layout>;
}
