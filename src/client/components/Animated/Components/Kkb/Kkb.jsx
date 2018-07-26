import * as React from 'react';
import styles from './Kkb.css';
import kkbImage from './kkb.svg';

import { Fan } from '../Fan/Fan';

export const Kkb = (props) => (
    <div className={styles.container}>
        <img className={styles.kkb}
            src={kkbImage}
        />
        <div className={styles.fan_box}>
            <Fan isOn={true} />
        </div>
    </div>
);
