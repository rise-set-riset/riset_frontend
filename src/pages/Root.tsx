import Header from "../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const location = useLocation();
  
  const showHeader = location.pathname !== "/signup";

  return (
    <>
      {showHeader && <Header />}
      <Outlet />
    </>
  );
}