import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
