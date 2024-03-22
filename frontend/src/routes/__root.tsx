import {
  createRootRoute,
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import Header from "../components/Header/Header";
import SideNav from "../components/SideNav/SideNav";
import { useEventStream } from "../hooks/useEventStream";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: Layout,
});

export default function Layout() {
  const { queryClient } = Route.useRouteContext();
  useEventStream(queryClient);
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
