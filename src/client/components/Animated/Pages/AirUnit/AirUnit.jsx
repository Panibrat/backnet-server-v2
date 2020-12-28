import * as React from 'react';

import styles from './AirUnit.css';
import airUnitImage from './air-unit-base.svg';
import { valueToFixed } from '../../../../common/helpers';
import { Kkb } from '../../Components/Kkb/Kkb';
import { SupplyFan } from '../../Components/SupplyFan/SupplyFan';
import { Coil } from '../../Components/Coil/Coil';
import { DamperVer } from '../../Components/Dampers/DamperVer/DamperVer';
import { DamperHor } from '../../Components/Dampers/DamperHor/DamperHor';
import warning from './warning2.svg';
import coolingImg from './snowflake.svg';
import heatingImg from './sun2.svg';

export const AirUnit = props => (
  <div className={styles.container}>
    {
            props.oAlarms.value ? (<img className={styles.alarmSign} src={warning} />)
                :
                null
    }
    {
            props.oRQ_HEAT.value ? (<img className={styles.heatSign} src={heatingImg} />)
                :
                null
    }
    {
            props.oRQ_COOL.value ? (<img className={styles.coolSign} src={coolingImg} />)
                :
                null
    }
    <img className={styles.air_unit}
      src={airUnitImage}
    />
    <div className={styles.kkb_box}>
      <Kkb isOn={props.oKKB.value} />
    </div>
    <div className={styles.supply_fan_box}>
      <SupplyFan isOn={props.oFan.value} />
    </div>
    <div className={styles.coil_box}>
      <Coil isHeat={props.oHeat.value} />
    </div>
    <div className={styles.t_for_box}>
      { valueToFixed(props.tFor.value) }℃
    </div>
    <div className={styles.damper_bottom_box}>
      <DamperVer isOpen={props.oDamperButtom.value}/>
    </div>
    <div className={styles.damper_top_box}>
      <DamperVer isOpen={props.oDamperTop.value}/>
    </div>
    <div className={styles.damper_fresh_box}>
      <DamperHor isOpen={props.damperFreshLevel.value > 5}/>
    </div>
    <div className={styles.t_out_box}>
      { valueToFixed(props.tOut.value) }℃
    </div>
    <div className={styles.t_ret_box}>
      { valueToFixed(props.tRet.value) }℃
    </div>
    <div className={styles.sp_t_ret_box}>
      { valueToFixed(props.spTRet.value) }℃
    </div>
    <div className={styles.sp_t_for_box}>
      { valueToFixed(props.spTFor.value) }℃
    </div>
    <div className={styles.damper_level_box}>
      {props.damperFreshLevel.value}%
    </div>
    <div className={styles.fan_pressue_box}>
      {props.dpFan.value}Pa
    </div>
    <div className={styles.fan_speed_box}>
      {props.speedFan.value}%
    </div>
    <div className={styles.freon_pressue_box}>
      { valueToFixed(props.pFreon.value / 100) }bar
    </div>
    <div className={styles.t_evaparator_box}>
      { valueToFixed(props.tIsp.value) }℃
    </div>
    <div className={styles.t_copmpressor_box}>
      { valueToFixed(props.tComp.value) }℃
    </div>
  </div>
);

export default AirUnit;
