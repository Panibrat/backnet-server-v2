import * as React from 'react';
import { connect } from 'react-redux';
import styles from './HeatingRadiatorsRight.css';
import heatFloorRight from './HeatingRadiatorsRight.svg';

import {Pump} from './../../Components/Pump/Pump'

export const HeatingRadiatorsRight = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={heatFloorRight}
        />
        <div className={styles.pump_box}>
            <Pump isOn={props.oPUMP_SO} />
        </div>
        <div className={styles.valve_level_box}>
            {props.oHEAT_SO}%
        </div>
        <div className={styles.t_for_box}>
            {props.iT_SO_FO.toFixed(1)}℃
        </div>
        <div className={styles.t_kitchen_box}>
            {props.iT_KITCHEN.toFixed(1)}℃
        </div>
        <div className={styles.t_zal_box}>
            {props.iT_ZAL.toFixed(1)}℃
        </div>
        <div className={styles.t_cabinet_box}>
            {props.iT_CABINET.toFixed(1)}℃
        </div>
        <div className={styles.t_bedroom_box}>
            {props.iT_BEDROOM.toFixed(1)}℃
        </div>
        <div className={styles.sp_t_for_box}>
            {props.oSP_SO.toFixed(1)}℃
        </div>
        <div className={styles.zal_level_box}>
            {props.oSO_ZAL}%
        </div>
        <div className={styles.kitchen_level_box}>
            {props.oSO_KITCH}%
        </div>
        <div className={styles.bedroom_level_box}>
            {props.oSO_BEDROOM}%
        </div>
        <div className={styles.cabinet_level_box}>
            {props.oSO_CABINET}%
        </div>
        <div className={styles.basement_level_box}>
            {props.oSO_BASE}%
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index].value
}

const mapStateToProps = (store) => {
    return {
        iT_SO_FO: findPoint('AI3000159', store.ai),
        oSP_SO: findPoint('AI3000169', store.ai),
        oHEAT_SO: findPoint('AI3000161', store.ai),
        iT_KITCHEN: findPoint('AI3000160', store.ai),
        iT_ZAL: findPoint('AI3000172', store.ai),
        iT_CABINET: findPoint('AI3000187', store.ai),
        iT_BEDROOM: findPoint('AI3000179', store.ai),
        oSO_ZAL: findPoint('AI3000164', store.ai),
        oSO_KITCH: findPoint('AI3000163', store.ai),
        oSO_BEDROOM: findPoint('AI3000165', store.ai),
        oSO_CABINET: findPoint('AI3000166', store.ai),
        oSO_BASE: findPoint('AI3000162', store.ai),
        oPUMP_SO: findPoint('BI3000247', store.bi),
    };
};

export default connect(mapStateToProps)(HeatingRadiatorsRight);