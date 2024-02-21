import clsx from "clsx";
import { PropsWithChildren } from "react";
import classes from "./MonoHeading.module.css";

interface Props {
  color?: "default" | "rose" | "pine" | "iris";
}

export default function MonoHeading({
  children,
  color = "default",
}: PropsWithChildren<Props>) {
  const cls = clsx(
    classes.header,
    classes["mono-font"],
    classes[`color-${color}`],
  );
  return <h1 className={cls}>{children}</h1>;
}
