import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotSignedIn.module.css";
const NotSignedIn = () => {
  return (
    <ul className={styles.nav}>
      <li className="px-3 py-2">
        <Link to="/" className={`${styles.navLink}`}>
          Home
        </Link>
      </li>
      <li className="px-3 py-2">
        <Link to="/orders" className={`${styles.navLink}`}>
          Orders
        </Link>
      </li>
    </ul>
  );
};

export default NotSignedIn;
