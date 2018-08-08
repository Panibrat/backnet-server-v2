import * as React from 'react';
import styles from './ElectroBoiler.css';
import BoilerBox from './boiler-box.svg';
import HeaterElectricOn from './electric-heater-on.svg';
import HeaterElectricOff from './electric-heater-off.svg';
import { Pump } from '../Pump/Pump';

export const ElectroBoiler = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
            src={BoilerBox}
        />
        <div className={styles.electric_heater1_box}>
            <img className={styles.electric_heater_img}
                src={props.isFirstStageOn ? HeaterElectricOn : HeaterElectricOff}
            />
        </div>
        <div className={styles.electric_heater2_box}>
            <img className={styles.electric_heater_img}
                src={props.isSecondStageOn ? HeaterElectricOn : HeaterElectricOff}
            />
        </div>
        <div className={styles.electric_heater3_box}>
            <img className={styles.electric_heater_img}
                src={props.isSecondStageOn ? HeaterElectricOn : HeaterElectricOff}
            />
        </div>
        <div className={styles.pump_box}>
            <Pump isOn={props.isPumpOn} />
        </div>
        <div className={styles.boiler_lable}>
            электро
        </div>
    </div>
);
