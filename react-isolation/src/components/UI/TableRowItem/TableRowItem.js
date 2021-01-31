import React from 'react';

import styles from './TableRowItem.module.css';

const tableRowItem = (props) => {

    let cell = <div style={{color: props.color}} className={styles.TableCol}>{props.cellData}</div>

    return cell;
}

export default tableRowItem;