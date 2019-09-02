import * as React from 'react';
import SocketIO from '../../../services/SocketService';

import List from '@material-ui/core/List';

import  AirDuct  from '../../Animated/Pages/AirDuct/AirDuct';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';
import styles from './DampersPage.css';

export class DampersPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Воздушные заслонки');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }

    render() {
        return (
            <div className={styles.container}>
                <AirDuct {...this.props}/>
                <List>
                    <AnalogOutputItemSlider
                        {...this.props.sD_L_K_B}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_D1_D2}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_R_K_B}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_R_ZAL}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_L_ZAL}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                </List>
            </div>
        );
    }
}

export default DampersPage;
