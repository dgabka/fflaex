import { Link } from "react-router-dom";
import githubSvg from "../assets/github.svg?raw";
import MonoHeading from "../components/MonoHeading/MonoHeading";
import classes from "./header.module.css";

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
