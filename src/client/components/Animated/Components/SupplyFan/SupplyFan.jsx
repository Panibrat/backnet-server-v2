import * as React from 'react';
import styles from './SupplyFan.css';
import fanImage from './supply_fan.svg';
import fanBoxImage from './supply_fan_box.svg';

export const SupplyFan = (props) => (
    <div className={styles.container}>
        <div className={styles.fan_box}>
            <img className={styles.box_img}
                 src={fanBoxImage} alt="" />
        </div>
        <div className={styles.fan_rotor}>
            <img className={props.isOn ? styles.rotating : null}
                 src={fanImage} alt="" />
        </div>

    </div>
);
