import * as React from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import  AirDuct  from '../../Animated/Pages/AirDuct/AirDuct';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';

import styles from './DampersPage.css';

export class DampersPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    Dampers page
                </div>
                <p style={{textAlign: "center"}}>{window.innerWidth} x {window.innerHeight}</p>
                <AirDuct />
                <List>
                    <AnalogOutputItemSlider {...this.props.sD_L_K_B}/>
                    <AnalogOutputItemSlider {...this.props.sD_D1_D2}/>
                    <AnalogOutputItemSlider {...this.props.sD_R_K_B}/>
                    <AnalogOutputItemSlider {...this.props.sD_R_ZAL}/>
                    <AnalogOutputItemSlider {...this.props.sD_L_ZAL}/>
                </List>
            </div>
        );
    }
}

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index]
}

const mapStateToProps = (store) => {
    return {
        sD_L_K_B: findPoint('AO3000351', store.ao),
        sD_D1_D2: findPoint('AO3000352', store.ao),
        sD_R_K_B: findPoint('AO3000353', store.ao),
        sD_R_ZAL: findPoint('AO3000354', store.ao),
        sD_L_ZAL: findPoint('AO3000355', store.ao)
    };
};

export default connect(mapStateToProps)(DampersPage);