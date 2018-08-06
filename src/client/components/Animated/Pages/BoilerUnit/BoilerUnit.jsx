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
                isElHeaterOn={true}
                isWaterHeaterOn={false}
            />
        </div>
        <div className={styles.pump_recirc_box}>
            <Pump isOn={true} />
        </div>
        <div className={styles.pump_circ_box}>
            <Pump isOn={true} />
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
        iT_SO_FO: findPoint('AI3000159', store.ai),
    };
};

export default connect(mapStateToProps)(BoilerUnit);