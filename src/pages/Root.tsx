import { useContext } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { ResponsiveContext } from "../contexts/ResponsiveContext";
import BottomMenu from "../components/Header/BottomMenu";

export default function Root() {
  const isMobile = useContext(ResponsiveContext);

  return (
    <>
      <Header />
      <Outlet />
      {isMobile && <BottomMenu />}
    </>
  );
}
