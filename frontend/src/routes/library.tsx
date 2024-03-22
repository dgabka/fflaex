import { Outlet, createFileRoute } from "@tanstack/react-router";
import LibraryItem from "../components/LibraryItem/LibraryItem";

import classes from "./library.module.css";
import LibraryToolbar from "../components/LibraryToolbar/LibraryToolbar";
import { libraryQueryOptions } from "../queries/library";
import { useQuery } from "@tanstack/react-query";
import { useLibraryStore } from "../hooks/useLibraryStore";
import { useEffect } from "react";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(libraryQueryOptions),
});

export default function LibraryPage() {
  const fetchedItems = Route.useLoaderData();
  const { items, setItems } = useLibraryStore();

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems, setItems]);

  return (
    <>
      <LibraryToolbar />
      <div className={classes["page-container"]}>
        <ul className={classes.list}>
          {items.map((item) => (
            <LibraryItem item={item} key={item.id} />
          ))}
        </ul>
        <Outlet />
      </div>
    </>
  );
}
