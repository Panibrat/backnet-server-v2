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
        <div className={styles.damper_bottom_box}>
            <DamperVer isOpen={props.oDamperButtom}/>
        </div>
        <div className={styles.damper_top_box}>
            <DamperVer isOpen={props.oDamperTop}/>
        </div>
        <div className={styles.damper_fresh_box}>
            <DamperHor isOpen={props.damperFreshLevel > 5}/>
        </div>
        <div className={styles.damper_level_box}>
            {props.damperFreshLevel}%
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
        damperFreshLevel: findPoint('AI3000314', store.ai),
        oDamperTop: findPoint('BI3000392', store.bi),
        oDamperButtom: findPoint('BI3000393', store.bi)
    };
};

export default connect(mapStateToProps)(AirDuct);
