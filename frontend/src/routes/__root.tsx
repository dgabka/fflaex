import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header/Header";
import SideNav from "../components/SideNav/SideNav";

export const Route = createRootRoute({ component: Layout });

export default function Layout() {
  return (
    <>
      <Header />
      <SideNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
