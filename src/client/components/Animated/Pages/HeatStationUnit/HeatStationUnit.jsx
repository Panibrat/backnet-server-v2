import * as React from 'react';
import styles from './HeatStationUnit.css';
import Pipes from './heat-station-pipes-base.svg';
import { valueToFixed } from '../../../../common/helpers';

import { GasBoiler } from './../../Components/GasBoiler/GasBoiler';
import { ElectroBoiler } from './../../Components/ElectroBoiler/ElectroBoiler';

export const HeatStationUnit = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={Pipes}
        />
        <div className={styles.gas_boiler_box}>
            <GasBoiler
                isOn={props.oKOTEL.value}
                isPumpOn={props.oKOTEL.value}
            />
        </div>
        <div className={styles.el_boiler_box}>
            <ElectroBoiler
                isFirstStageOn={props.oEL_1X.value}
                isSecondStageOn={props.oEL_2X.value}
                isPumpOn={props.oPUMP_EL.value}
            />
        </div>
        <div className={styles.sp_t_for}>
            { valueToFixed(props.oSP_KOT.value) }℃
        </div>
        <div className={styles.t_for}>
            { valueToFixed(props.iT_SUP.value) }℃
        </div>
        <div className={styles.t_ret}>
            { valueToFixed(props.iT_RET.value) }℃
        </div>
    </div>
);

export default HeatStationUnit;
