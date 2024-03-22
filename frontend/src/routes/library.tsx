import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import LibraryItem from "@components/LibraryItem/LibraryItem";
import LibraryToolbar from "@components/LibraryToolbar/LibraryToolbar";
import { useLibraryStore } from "@hooks/useLibraryStore";
import { libraryQueryOptions } from "@queries/library";
import classes from "./library.module.css";

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
            <LibraryItem file={item} key={item.id} />
          ))}
        </ul>
        <Outlet />
      </div>
    </>
  );
}
