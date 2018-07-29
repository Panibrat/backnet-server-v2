import * as React from 'react';
import styles from './DamperHor.css';

import damperOpenImg from './dmpr_hor_open.svg';
import damperClosedImg from './dmpr_hor_closed.svg';

export const DamperHor = (props) => (
    <div className={styles.container}>
        <img className={styles.damper}
            src={props.isOpen ? damperOpenImg : damperClosedImg}
        />
    </div>
);
