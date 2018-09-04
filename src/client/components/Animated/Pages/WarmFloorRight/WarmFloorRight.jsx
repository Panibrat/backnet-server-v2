import * as React from 'react';
import { connect } from 'react-redux';
import styles from './WarmFloorRight.css';
import heatFloorRight from './heatFloorRight.svg';

import {Pump} from './../../Components/Pump/Pump'

export const WarmFloorRight = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={heatFloorRight}
        />
        <div className={styles.pump_box}>
            <Pump isOn={props.oPUMP_HF} />
        </div>
        <div className={styles.valve_level_box}>
            {props.oHEAT_HF}%
        </div>
        <div className={styles.t_for_box}>
            {props.iT_HF_FO.toFixed(1)}℃
        </div>
        <div className={styles.t_kitchen_box}>
            {props.iT_KITCHEN.toFixed(1)}℃
        </div>
        <div className={styles.t_hf_kitchen_box}>
            {props.iT_HF_KITCH.toFixed(1)}℃
        </div>
        <div className={styles.sp_t_for_box}>
            {props.oSP_HF.toFixed(1)}℃
        </div>
        <div className={styles.hall_level_box}>
            {props.oHF_HALL}%
        </div>
        <div className={styles.kitchen_level_box}>
            {props.oHF_KITCH}%
        </div>
        <div className={styles.wc1_level_box}>
            {props.oHF_WC1}%
        </div>
        <div className={styles.wc2_level_box}>
            {props.oHF_WC2}%
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index].value
}

const mapStateToProps = (store) => {
    return {
        iT_HF_FO: findPoint('AI3000178', store.ai),
        oSP_HF: findPoint('AI3000181', store.ai),
        oHEAT_HF: findPoint('AI3000182', store.ai),
        iT_HF_KITCH: findPoint('AI3000177', store.ai),
        iT_KITCHEN: findPoint('AI3000160', store.ai),
        oHF_WC1: findPoint('AI3000183', store.ai),
        oHF_WC2: findPoint('AI3000184', store.ai),
        oHF_KITCH: findPoint('AI3000185', store.ai),
        oHF_HALL: findPoint('AI3000186', store.ai),
        oPUMP_HF: findPoint('BI3000261', store.bi),
    };
};

export default connect(mapStateToProps)(WarmFloorRight);