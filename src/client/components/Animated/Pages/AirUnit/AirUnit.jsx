import * as React from 'react';
import styles from './AirUnit.css';
import airUnitImage from './air-unit-base.svg';

import { Kkb } from '../../Components/Kkb/Kkb';
import { SupplyFan} from "../../Components/SupplyFan/SupplyFan";
import { Coil } from "../../Components/Coil/Coil";

export const AirUnit = (props) => (
    <div className={styles.container}>
        <img className={styles.air_unit}
            src={airUnitImage}
        />
        <div className={styles.kkb_box}>
            <Kkb isOn={true}/>
        </div>
        <div className={styles.supply_fan_box}>
            <SupplyFan />
        </div>
        <div className={styles.coil_box}>
            <Coil isHeat={false} />
        </div>
        <div className={styles.t_for_box}>
            25,5C
        </div>
    </div>
);
