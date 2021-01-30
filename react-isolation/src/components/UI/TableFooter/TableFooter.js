import React from "react";

import styles from "./TableFooter.module.css";

const tableFooter = props => {
  return (
    <footer className={styles.TableFooter}>
      {props.numOfMissions + " missions"}
    </footer>
  );
};

export default tableFooter;
