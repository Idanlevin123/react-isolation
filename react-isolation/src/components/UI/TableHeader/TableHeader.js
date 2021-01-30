import React from "react";

import styles from "./TableHeadr.module.css";

const tableHeader = (props) => {

  return (
    <React.Fragment>
      <header className={styles.TableHeader}>
        <div className={styles.TableCol}>
          <strong>Agent ID</strong>
        </div>
        <div className={styles.TableCol}>
          <strong>Country</strong>
        </div>
        <div className={styles.TableCol}>
          <strong>Address</strong>
        </div>
        <div className={styles.TableCol}>
          <strong>Date</strong>
        </div>
      </header>
    </React.Fragment>
  );
};

export default tableHeader;
