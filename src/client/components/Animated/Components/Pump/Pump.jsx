import * as React from 'react';
import styles from './Pump.css';
import pumpImage from './motor.svg';
import pumpBoxImage from './pump_box.svg';

export const Pump = (props) => (
    <div className={styles.container}>
        <div className={styles.pump_box}>
            <img className={styles.box_img}
                 src={pumpBoxImage} alt="" />
        </div>
        <div className={styles.pump_rotor}>
            <img className={props.isOn ? styles.rotating : null}
                 src={pumpImage} alt="" />
        </div>

    </div>
);
