import { createFileRoute } from "@tanstack/react-router";
import classes from "./$itemId.module.css";
import StreamDetails from "../../components/StreamDetails/StreamDetails";

export const Route = createFileRoute("/library/$itemId")({
  loader,
  component: ItemDetails,
});

async function loader({
  params: { itemId },
}: {
  params: { itemId: string };
}): Promise<FileData> {
  const res = await fetch(`http://localhost:8000/api/file/${itemId}`, {
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });
  const json = await res.json();

  return json as FileData;
}

export default function ItemDetails() {
  const data = Route.useLoaderData();

  console.log(data);
  return (
    <div className={classes["page-container"]}>
      <p>Streams:</p>
      {data.streams.map((s) => (
        <StreamDetails data={s} />
      ))}
      <p>Streams:</p>
      {data.streams.map((s) => (
        <StreamDetails data={s} />
      ))}
      <p>Streams:</p>
      {data.streams.map((s) => (
        <StreamDetails data={s} />
      ))}
      <p>Streams:</p>
      {data.streams.map((s) => (
        <StreamDetails data={s} />
      ))}
    </div>
  );
}
