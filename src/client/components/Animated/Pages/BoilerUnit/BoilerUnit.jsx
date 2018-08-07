import * as React from 'react';
import { connect } from 'react-redux';
import styles from './BoilerUnit.css';
import BoilerPipes from './boiler-pipes-base.svg';

import { Pump } from './../../Components/Pump/Pump'
import { Boiler } from './../../Components/Boiler/Boiler';

export const BoilerUnit = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={BoilerPipes}
        />
        <div className={styles.boiler_box}>
            <Boiler
                isElHeaterOn={props.oBOYLER}
                isWaterHeaterOn={props.oPUMP_BOY}
                tGVS={props.iT_GVS_R}
            />
        </div>
        <div className={styles.pump_recirc_box}>
            <Pump isOn={props.oPUMP_REC} />
        </div>
        <div className={styles.pump_circ_box}>
            <Pump isOn={props.oPUMP_BOY} />
        </div>
        <div className={styles.recirc_lable}>
            рециркуляция
        </div>
        <div className={styles.sp_t_gvs}>
            {props.sT_GVS}℃
        </div>
        <div className={styles.circ_lable}>
            циркуляция
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
        iT_GVS_R: findPoint('AI3000174', store.ai),
        sT_GVS: findPoint('AO3000209', store.ao),
        oPUMP_BOY: findPoint('BI3000254', store.bi),
        oPUMP_REC: findPoint('BI3000255', store.bi),
        oBOYLER: findPoint('BI3000253', store.bi),
    };
};

export default connect(mapStateToProps)(BoilerUnit);
