import { Link } from "@tanstack/react-router";
import githubSvg from "../../assets/github.svg?raw";
import MonoHeading from "../MonoHeading/MonoHeading";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <Link to={"/"}>
        <MonoHeading color="rose">fflaex</MonoHeading>
      </Link>
      <a
        href="https://github.com/dgabka/fflaex"
        target="_blank"
        className={classes["logo"]}
        dangerouslySetInnerHTML={{ __html: githubSvg }}
      ></a>
    </header>
  );
}
