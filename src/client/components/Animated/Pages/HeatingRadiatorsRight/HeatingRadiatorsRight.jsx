import * as React from 'react';
import styles from './HeatingRadiatorsRight.css';
import heatFloorRight from './HeatingRadiatorsRight.svg';

import { Pump } from './../../Components/Pump/Pump'
import { valueToFixed } from '../../../../common/helpers';

export const HeatingRadiatorsRight = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={heatFloorRight}
        />
        <div className={styles.pump_box}>
            <Pump isOn={props.oPUMP_SO.value} />
        </div>
        <div className={styles.valve_level_box}>
            {props.oHEAT_SO.value}%
        </div>
        <div className={styles.t_for_box}>
            { valueToFixed(props.iT_SO_FO.value) }℃
        </div>
        <div className={styles.t_kitchen_box}>
            { valueToFixed(props.iT_KITCHEN.value) }℃
        </div>
        <div className={styles.t_zal_box}>
            { valueToFixed(props.iT_ZAL.value) }℃
        </div>
        <div className={styles.t_cabinet_box}>
            { valueToFixed(props.iT_CABINET.value) }℃
        </div>
        <div className={styles.t_bedroom_box}>
            { valueToFixed(props.iT_BEDROOM.value) }℃
        </div>
        <div className={styles.sp_t_for_box}>
            { valueToFixed(props.oSP_SO.value) }℃
        </div>
        <div className={styles.zal_level_box}>
            {props.oSO_ZAL.value}%
        </div>
        <div className={styles.kitchen_level_box}>
            {props.oSO_KITCH.value}%
        </div>
        <div className={styles.bedroom_level_box}>
            {props.oSO_BEDROOM.value}%
        </div>
        <div className={styles.cabinet_level_box}>
            {props.oSO_CABINET.value}%
        </div>
        <div className={styles.basement_level_box}>
            {props.oSO_BASE.value}%
        </div>
        <div className={styles.zal_lable}>
            зал
        </div>
        <div className={styles.kitchen_lable}>
            кухня
        </div>
        <div className={styles.bedroom_lable}>
            спальня
        </div>
        <div className={styles.cabinet_lable}>
            кабинет
        </div>
        <div className={styles.basement_lable}>
            подвал
        </div>
    </div>
);

export default HeatingRadiatorsRight;