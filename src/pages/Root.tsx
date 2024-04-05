import { useContext } from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { ResponsiveContext } from "../contexts/ResponsiveContext";
import BottomNav from "../components/Header/BottomNav";

export default function Root() {
  const isMobile = useContext(ResponsiveContext);

  return (
    <>
      <Header />
      <Outlet />
      {isMobile && <BottomNav />}
    </>
  );
}
