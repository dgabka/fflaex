import { Outlet, createFileRoute } from "@tanstack/react-router";
import LibraryItem from "../components/LibraryItem/LibraryItem";

import classes from "./library.module.css";

export const Route = createFileRoute("/library")({
  component: LibraryPage,
  loader,
});

async function loader(): Promise<Array<FileData>> {
  const res = await fetch("http://localhost:8000/api/file", {
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();

  return json as Array<FileData>;
}

export default function LibraryPage() {
  const data: FileData[] = Route.useLoaderData();

  return (
    <div className={classes["page-container"]}>
      <ul className={classes.list}>
        {data.map((item) => (
          <LibraryItem item={item} key={item.id} />
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
