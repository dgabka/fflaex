import { createFileRoute } from "@tanstack/react-router";
import MetadataTableExpandable from "@components/MetadataTableExpandable/MetadataTableExpandable";
import StreamDetails from "@components/StreamDetails/StreamDetails";
import { libraryItemQueryOptions } from "@queries/library";
import { getFileName } from "@utils/getFileName";
import { stripNameFromPath } from "@utils/getFilePath";
import classes from "./$itemId.module.css";

export const Route = createFileRoute("/library/$itemId")({
  loader: ({ context: { queryClient }, params: { itemId } }) =>
    queryClient.ensureQueryData(libraryItemQueryOptions(+itemId)),
  component: ItemDetails,
});

export default function ItemDetails() {
  const file = Route.useLoaderData();

  return (
    <div className={classes["page-container"]}>
      <div className={classes["heading-container"]}>
        <h3 className={classes.heading}>{getFileName(file.filepath)}</h3>
        <div className={classes["sub-heading"]}>
          <span className={classes.path}>
            {stripNameFromPath(file.filepath)}
          </span>
          <span className={classes.ext}>mp4</span>
        </div>
      </div>
      <MetadataTableExpandable tags={file.format.tags}/>
      <p>Streams:</p>
      {file.streams.map((s) => (
        <StreamDetails key={s.index} data={s} />
      ))}
    </div>
  );
}
