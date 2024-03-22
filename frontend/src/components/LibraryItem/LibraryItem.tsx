import { Link } from "@tanstack/react-router";
import { getFileName } from "@utils/getFileName";
import classes from "./LibraryItem.module.css";

interface Props {
  file: FileData;
}

export default function LibraryItem({ file }: Props): JSX.Element {
  return (
    <Link
      to={file.id.toString()}
      className={classes.item}
      activeProps={{ className: classes.active }}
    >
      <p className={classes["item-label"]}>filename:</p>
      <p>{getFileName(file.filepath)}</p>
    </Link>
  );
}
