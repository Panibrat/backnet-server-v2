import * as React from 'react';
import styles from './WarmFloorRight.css';
import heatFloorRight from './heatFloorRight.svg';

import {Pump} from './../../Components/Pump/Pump';
import { valueToFixed } from '../../../../common/helpers';

export const WarmFloorRight = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={heatFloorRight}
        />
        <div className={styles.pump_box}>
            <Pump isOn={props.oPUMP_HF.value} />
        </div>
        <div className={styles.valve_level_box}>
            {props.oHEAT_HF.value}%
        </div>
        <div className={styles.t_for_box}>
            {valueToFixed(props.iT_HF_FO.value)}℃
        </div>
        <div className={styles.t_kitchen_box}>
            { valueToFixed(props.iT_KITCHEN.value) }℃
        </div>
        <div className={styles.t_hf_kitchen_box}>
            {valueToFixed(props.iT_HF_KITCH.value)}℃
        </div>
        <div className={styles.sp_t_for_box}>
            {valueToFixed(props.oSP_HF.value)}℃
        </div>
        <div className={styles.hall_level_box}>
            {props.oHF_HALL.value}%
        </div>
        <div className={styles.kitchen_level_box}>
            {props.oHF_KITCH.value}%
        </div>
        <div className={styles.wc1_level_box}>
            {props.oHF_WC1.value}%
        </div>
        <div className={styles.wc2_level_box}>
            {props.oHF_WC2.value}%
        </div>
        <div className={styles.hall_lable}>
            тамбур
        </div>
        <div className={styles.kitchen_lable}>
            кухня
        </div>
        <div className={styles.wc1_lable}>
            с/у1
        </div>
        <div className={styles.wc2_lable}>
            с/у2
        </div>
    </div>
);

export default WarmFloorRight;
