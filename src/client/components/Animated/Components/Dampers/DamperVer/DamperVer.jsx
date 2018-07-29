import * as React from 'react';
import styles from './DamperVer.css';

import damperOpenImg from './dmpr_ver_open.svg';
import damperClosedImg from './dmpr_ver_closed.svg';

export const DamperVer = (props) => (
    <div className={styles.container}>
        <img className={styles.damper}
            src={props.isOpen ? damperOpenImg : damperClosedImg}
        />
    </div>
);
