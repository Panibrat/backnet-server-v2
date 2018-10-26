import * as React from 'react';
import { connect } from 'react-redux';
import styles from './HeatStationUnit.css';
import Pipes from './heat-station-pipes-base.svg';

import { GasBoiler } from './../../Components/GasBoiler/GasBoiler';
import { ElectroBoiler } from './../../Components/ElectroBoiler/ElectroBoiler';

export const HeatStationUnit = (props) => (
    <div className={styles.container}>
        <img className={styles.base_img}
             src={Pipes}
        />
        <div className={styles.gas_boiler_box}>
            <GasBoiler
                isOn={props.oKOTEL}
                isPumpOn={props.oKOTEL}
            />
        </div>
        <div className={styles.el_boiler_box}>
            <ElectroBoiler
                isFirstStageOn={props.oEL_1X}
                isSecondStageOn={props.oEL_2X}
                isPumpOn={props.oPUMP_EL}
            />
        </div>
        <div className={styles.sp_t_for}>
            {props.oSP_KOT.toFixed(1)}℃
        </div>
        <div className={styles.t_for}>
            {props.iT_SUP.toFixed(1)}℃
        </div>
        <div className={styles.t_ret}>
            {props.iT_RET.toFixed(1)}℃
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
        iT_SUP: findPoint('AI3000157', store.ai),
        iT_RET: findPoint('AI3000158', store.ai),
        oSP_KOT: findPoint('AI3000171', store.ai),

        oPUMP_EL: findPoint('BI3000279', store.bi),
        oKOTEL: findPoint('BI3000249', store.bi),
        oEL_1X: findPoint('BI3000278', store.bi),
        oEL_2X: findPoint('BI3000277', store.bi),
    };
};

export default connect(mapStateToProps)(HeatStationUnit);
