import React from "react";

import styles from "./TableRow.module.css";
import TableRowItem from "../TableRowItem/TableRowItem";

const tableRow = (props) => {

  return (
    <div className={styles.TableRow}>
      {Object.values(props.data).map((val, index) => (
        <TableRowItem key={Math.random()} color={props.color} cellData={val} />
      ))}
    </div>
  );
};


export default tableRow;
