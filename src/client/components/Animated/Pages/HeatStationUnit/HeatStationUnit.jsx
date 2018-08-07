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
            <GasBoiler />
        </div>
        <div className={styles.el_boiler_box}>
            <ElectroBoiler />
        </div>
        <div className={styles.sp_t_for}>
            67,5℃
        </div>
        <div className={styles.t_for}>
            56,2℃
        </div>
        <div className={styles.t_ret}>
            31,9℃
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

export default connect(mapStateToProps)(HeatStationUnit);
