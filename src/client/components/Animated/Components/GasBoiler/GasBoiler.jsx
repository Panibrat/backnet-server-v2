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
        <div className={styles.fire_box}>
            <Fire/>
        </div>
        <div className={styles.pump_box}>
            <Pump isOn={true} />
        </div>
        <div className={styles.boiler_lable}>
            газовый
        </div>
    </div>
);
