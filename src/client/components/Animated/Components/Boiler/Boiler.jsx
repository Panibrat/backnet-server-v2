import * as React from 'react';
import styles from './Boiler.css';
import BoilerBox from './boiler-box.svg';
import HeaterElectricOn from './electric-heater-on.svg';
import HeaterElectricOff from './electric-heater-off.svg';
import HeaterWaterOn from './water-heater-on.svg';
import HeaterWaterOff from './water-heater-off.svg';

export const Boiler = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={BoilerBox}
        />
        <div className={styles.electric_heater_box}>
            <img className={styles.electric_heater_img}
                 src={props.isElHeaterOn ? HeaterElectricOn : HeaterElectricOff}
            />
        </div>
        <div className={styles.water_heater_box}>
            <img className={styles.water_heater_img}
                 src={props.isWaterHeaterOn ? HeaterWaterOn : HeaterWaterOff}
            />
        </div>
        <div className={styles.t_gvs_box}>
            {props.tGVS.toFixed(1)}℃
        </div>
    </div>
);
