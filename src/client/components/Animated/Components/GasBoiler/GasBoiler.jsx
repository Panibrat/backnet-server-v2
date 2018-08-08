import * as React from 'react';
import styles from './GasBoiler.css';
import BoilerBox from './boiler-box.svg';
import { Fire } from '../Fire/Fire';
import { Pump } from './../Pump/Pump';

export const GasBoiler = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={BoilerBox}
        />
        <div className={props.isOn ? styles.fire_box : styles.hidden}>
            <Fire />
        </div>
        <div className={styles.pump_box}>
            <Pump isOn={props.isPumpOn} />
        </div>
        <div className={styles.boiler_lable}>
            газовый
        </div>
    </div>
);
