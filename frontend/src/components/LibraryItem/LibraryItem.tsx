import { Link } from "@tanstack/react-router";
import classes from "./LibraryItem.module.css";

interface File {
  id: number;
  filepath: string;
  streams: Record<string, any>;
  format: Record<string, any>;
}

export default function LibraryItem(props: { item: File }) {
  return (
    <Link
      to={props.item.id.toString()}
      className={classes.item}
      activeProps={{ className: classes.active }}
    >
      <p className={classes["item-label"]}>filename:</p>
      <p>{props.item.filepath.split("/").pop()}</p>
    </Link>
  );
}
