import * as React from 'react';
import styles from './BoilerUnit.css';
import BoilerPipes from './boiler-pipes-base.svg';

import { Pump } from './../../Components/Pump/Pump'
import { Boiler } from './../../Components/Boiler/Boiler';
import { valueToFixed } from '../../../../common/helpers';

export const BoilerUnit = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={BoilerPipes}
        />
        <div className={styles.boiler_box}>
            <Boiler
                isElHeaterOn={props.oBOYLER.value}
                isWaterHeaterOn={props.oPUMP_BOY.value}
                tGVS={ valueToFixed(props.iT_GVS_R.value) }
            />
        </div>
        <div className={styles.pump_recirc_box}>
            <Pump isOn={props.oPUMP_REC.value} />
        </div>
        <div className={styles.pump_circ_box}>
            <Pump isOn={props.oPUMP_BOY.value} />
        </div>
        <div className={styles.recirc_lable}>
            рециркуляция
        </div>
        <div className={styles.sp_t_gvs}>
            { props.sT_GVS.value }℃
        </div>
        <div className={styles.circ_lable}>
            циркуляция
        </div>
    </div>
);

export default BoilerUnit;
