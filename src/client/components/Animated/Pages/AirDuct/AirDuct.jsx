import * as React from 'react';
import { connect } from 'react-redux';
import styles from './AirDuct.css';
import airDuctImage from './air-duct-base.svg';

import { DamperVer} from "../../Components/Dampers/DamperVer/DamperVer";
import { DamperHor} from "../../Components/Dampers/DamperHor/DamperHor";


export const AirDuct = (props) => (
    <div className={styles.container}>
        <img className={styles.air_duct}
            src={airDuctImage}
        />
        <div className={styles.damper_zal_left_box}>
            <DamperVer isOpen={props.sD_L_ZAL > 5}/>
        </div>
        <div className={styles.damper_zal_right_box}>
            <DamperVer isOpen={props.sD_R_ZAL > 5}/>
        </div>
        <div className={styles.damper_bedroom_right_box}>
            <DamperVer isOpen={props.sD_R_K_B > 5}/>
        </div>
        <div className={styles.damper_bedroom_left_box}>
            <DamperHor isOpen={props.sD_L_K_B > 5}/>
        </div>
        <div className={styles.damper_cabinet_left_box}>
            <DamperHor isOpen={props.sD_L_K_B > 5}/>
        </div>
        <div className={styles.damper_cabinet_right_box}>
            <DamperVer isOpen={props.sD_R_K_B > 5}/>
        </div>
        <div className={styles.damper_child_1_box}>
            <DamperVer isOpen={props.sD_D1_D2 > 5}/>
        </div>
        <div className={styles.damper_child_2_box}>
            <DamperVer isOpen={props.sD_D1_D2 > 5}/>
        </div>
        <div className={styles.fan_pressue_box}>
            {props.dpFan}Pa
        </div>
        <div className={styles.sD_L_K_B_box}>
            {props.sD_L_K_B}%
        </div>
        <div className={styles.sD_D1_D2_box}>
            {props.sD_D1_D2}%
        </div>
        <div className={styles.sD_R_K_B_box}>
            {props.sD_R_K_B}%
        </div>
        <div className={styles.sD_R_ZAL_box}>
            {props.sD_R_ZAL}%
        </div>
        <div className={styles.sD_L_ZAL_box}>
            {props.sD_L_ZAL}%
        </div>
        <div className={styles.bedroom_L_lable}>
            спальня
        </div>
        <div className={styles.bedroom_R_lable}>
            спальня
        </div>
        <div className={styles.zal_L_lable}>
            зал
        </div>
        <div className={styles.zal_R_lable}>
            зал
        </div>
        <div className={styles.cabinet_L_lable}>
            кабинет
        </div>
        <div className={styles.cabinet_R_lable}>
            кабинет
        </div>
        <div className={styles.childroom_lable}>
            детские
        </div>
    </div>
);

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index].value
};

const mapStateToProps = (store) => {
    return {
        sD_L_K_B: findPoint('AO3000351', store.ao),
        sD_D1_D2: findPoint('AO3000352', store.ao),
        sD_R_K_B: findPoint('AO3000353', store.ao),
        sD_R_ZAL: findPoint('AO3000354', store.ao),
        sD_L_ZAL: findPoint('AO3000355', store.ao),
        dpFan: findPoint('AI3000311', store.ai)
    };
};

export default connect(mapStateToProps)(AirDuct);
