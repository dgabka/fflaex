import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import Header from "@components/Header/Header";
import SideNav from "@components/SideNav/SideNav";
import { useEventStream } from "@hooks/useEventStream";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: Layout,
});

export default function Layout() {
  useEventStream();
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
