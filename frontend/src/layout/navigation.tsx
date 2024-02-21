import clsx from "clsx";
import { NavLink } from "react-router-dom";
import classes from "./navigation.module.css";

export default function SideNav() {
  const cls = ({ isActive }: { isActive: boolean }) =>
    clsx({ [classes["active-link"]]: isActive });

  return (
    <nav className={classes.nav}>
      <ul className={classes["nav-list"]}>
        <NavLink className={cls} to={"/"}>
          <li className={classes["list-item"]}>Dashboard</li>
        </NavLink>
        <NavLink className={cls} to={"/library"}>
          <li className={classes["list-item"]}>Library</li>
        </NavLink>
        <NavLink className={cls} to={"/settings"}>
          <li className={classes["list-item"]}>Settings</li>
        </NavLink>
      </ul>
    </nav>
  );
}
