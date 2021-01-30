import React from "react";

import styles from "./TableRow.module.css";
import TableRowItem from "../TableRowItem/TableRowItem";

const tableRow = (props) => {

  let i = 1;

  return (
    <div className={styles.TableRow}>
      {Object.values(props.data).map((val, index) => (
        <TableRowItem key={index + new Date()} color={props.color} cellData={val} />
      ))}
    </div>
  );
};


export default tableRow;
