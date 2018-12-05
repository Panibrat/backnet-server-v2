import * as React from 'react';
import { connect } from 'react-redux';
import styles from './AirUnit.css';
import airUnitImage from './air-unit-base.svg';

import { Kkb } from '../../Components/Kkb/Kkb';
import { SupplyFan} from "../../Components/SupplyFan/SupplyFan";
import { Coil } from "../../Components/Coil/Coil";
import { DamperVer} from "../../Components/Dampers/DamperVer/DamperVer";
import { DamperHor} from "../../Components/Dampers/DamperHor/DamperHor";
import {AhuPage} from "../../../Pages/AHU/AhuPage";

export const AirUnit = (props) => (
    <div className={styles.container}>
        <img className={styles.air_unit}
            src={airUnitImage}
        />
        <div className={styles.kkb_box}>
            <Kkb isOn={props.oKKB} />
        </div>
        <div className={styles.supply_fan_box}>
            <SupplyFan isOn={props.oFan} />
        </div>
        <div className={styles.coil_box}>
            <Coil isHeat={props.oHeat} />
        </div>
        <div className={styles.t_for_box}>
            {props.tFor.toFixed(1)}℃
        </div>
        <div className={styles.damper_bottom_box}>
            <DamperVer isOpen={props.oDamperButtom}/>
        </div>
        <div className={styles.damper_top_box}>
            <DamperVer isOpen={props.oDamperTop}/>
        </div>
        <div className={styles.damper_fresh_box}>
            <DamperHor isOpen={props.damperFreshLevel > 5}/>
        </div>
        <div className={styles.t_out_box}>
            {props.tOut.toFixed(1)}℃
        </div>
        <div className={styles.t_ret_box}>
            {props.tRet.toFixed(1)}℃
        </div>
        <div className={styles.sp_t_ret_box}>
            {props.spTRet.toFixed(1)}℃
        </div>
        <div className={styles.sp_t_for_box}>
            {props.spTFor.toFixed(1)}℃
        </div>
        <div className={styles.damper_level_box}>
            {props.damperFreshLevel}%
        </div>
        <div className={styles.fan_pressue_box}>
            {props.dpFan}Pa
        </div>
        <div className={styles.fan_speed_box}>
            {props.speedFan}%
        </div>
        <div className={styles.freon_pressue_box}>
            {(props.pFreon/100).toFixed(2)}bar
        </div>
        <div className={styles.t_evaparator_box}>
            {props.tIsp.toFixed(1)}℃
        </div>
        <div className={styles.t_copmpressor_box}>
            {props.tComp.toFixed(1)}℃
        </div>
    </div>
);

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index].value;
}

const mapStateToProps = (store) => {
    return {
        tFor: findPoint('AI3001122', store.ai),
        tOut: findPoint('AI3001121', store.ai),
        tRet: findPoint('AI3001123', store.ai),
        tIsp: findPoint('AI3001124', store.ai),
        tComp: findPoint('AI3001154', store.ai),
        pFreon: findPoint('AI3001126', store.ai),
        dpFan: findPoint('AI3001125', store.ai),
        spTFor: findPoint('AI3001133', store.ai),
        spTRet: findPoint('AI3001157', store.ai),
        speedFan: findPoint('AI3001127', store.ai),
        damperFreshLevel: findPoint('AI3001128', store.ai),
        oKKB: findPoint('BI3001200', store.bi),
        oFan: findPoint('BI3001199', store.bi),
        oHeat: findPoint('BI3001202', store.bi),
        oDamperTop: findPoint('BI3001208', store.bi),
        oDamperButtom: findPoint('BI3001209', store.bi)
    };
};

export default connect(mapStateToProps)(AirUnit);