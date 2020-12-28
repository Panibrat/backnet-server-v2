import * as React from 'react';

import styles from './AirDuct.css';
import airDuctImage from './air-duct-base.svg';
import { DamperVer } from '../../Components/Dampers/DamperVer/DamperVer';
import { DamperHor } from '../../Components/Dampers/DamperHor/DamperHor';

export const AirDuct = props => (
  <div className={styles.container}>
    <img className={styles.air_duct}
      src={airDuctImage}
    />
    <div className={styles.damper_zal_left_box}>
      <DamperVer isOpen={props.sD_L_ZAL.value > 5}/>
    </div>
    <div className={styles.damper_zal_right_box}>
      <DamperVer isOpen={props.sD_R_ZAL.value > 5}/>
    </div>
    <div className={styles.damper_bedroom_right_box}>
      <DamperVer isOpen={props.sD_R_K_B.value > 5}/>
    </div>
    <div className={styles.damper_bedroom_left_box}>
      <DamperHor isOpen={props.sD_L_K_B.value > 5}/>
    </div>
    <div className={styles.damper_cabinet_left_box}>
      <DamperHor isOpen={props.sD_L_K_B.value > 5}/>
    </div>
    <div className={styles.damper_cabinet_right_box}>
      <DamperVer isOpen={props.sD_R_K_B.value > 5}/>
    </div>
    <div className={styles.damper_child_1_box}>
      <DamperVer isOpen={props.sD_D1_D2.value > 5}/>
    </div>
    <div className={styles.damper_child_2_box}>
      <DamperVer isOpen={props.sD_D1_D2.value > 5}/>
    </div>
    <div className={styles.fan_pressue_box}>
      {props.dpFan.value}Pa
    </div>
    <div className={styles.sD_L_K_B_box}>
      {props.sD_L_K_B.value}%
    </div>
    <div className={styles.sD_D1_D2_box}>
      {props.sD_D1_D2.value}%
    </div>
    <div className={styles.sD_R_K_B_box}>
      {props.sD_R_K_B.value}%
    </div>
    <div className={styles.sD_R_ZAL_box}>
      {props.sD_R_ZAL.value}%
    </div>
    <div className={styles.sD_L_ZAL_box}>
      {props.sD_L_ZAL.value}%
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

export default AirDuct;
