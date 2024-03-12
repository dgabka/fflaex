import { Link } from "@tanstack/react-router";
import classes from "./SideNav.module.css";

export default function SideNav() {
  return (
    <nav className={classes.nav}>
      <ul className={classes["nav-list"]}>
        <Link to={"/"} activeProps={{ className: classes["active-link"] }}>
          <li className={classes["list-item"]}>Dashboard</li>
        </Link>
        <Link
          to={"/library"}
          activeProps={{ className: classes["active-link"] }}
        >
          <li className={classes["list-item"]}>Library</li>
        </Link>
        {/* <Link  to={"/settings"}> */}
        {/*   <li className={classes["list-item"]}>Settings</li> */}
        {/* </Link> */}
      </ul>
    </nav>
  );
}
