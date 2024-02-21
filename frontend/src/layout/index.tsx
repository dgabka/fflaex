import Header from "./header";
import SideNav from "./navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <SideNav />
      <main style={{ display: "inline-block" }}>
        <Outlet />
      </main>
    </>
  );
}
