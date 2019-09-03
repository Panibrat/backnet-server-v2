import * as React from 'react';
import SocketIO from '../../../services/SocketService';

import List from '@material-ui/core/List';

import HeatingRadiatorsRight  from '../../Animated/Pages/HeatingRadiatorsRight/HeatingRadiatorsRight';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';
import styles from './HeatingRadiatorsRightPage.css';

export class HeatingRadiatorsRightPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Радиаторное отопление');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }
    render() {
        return (
            <div className={styles.container}>
                <HeatingRadiatorsRight {...this.props } />
                <div className={styles.values_container}>
                    <List className={styles.list_type}>
                        <BinaryOutputItem {...this.props.sSTR_SO} />
                        <BinaryOutputItem {...this.props.sSO_AUTO} />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogOutputItemSlider
                            {...this.props.sT_SO_FOR}
                            minValue={10}
                            maxValue={85}
                            stepValue={1}
                            units={'℃'}
                        />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogInputItem {...this.props.iT_SO_FO} />
                        <AnalogInputItem {...this.props.oSP_SO} />
                        <AnalogInputItem {...this.props.oHEAT_SO} />
                        <AnalogInputItem {...this.props.iT_KITCHEN} />
                        <AnalogInputItem {...this.props.iT_ZAL} />
                        <AnalogInputItem {...this.props.iT_CABINET} />
                        <AnalogInputItem {...this.props.iT_BEDROOM} />
                    </List>
                    <List>
                        <BinaryInputItem {...this.props.oPUMP_SO} />
                    </List>
                </div>
            </div>
        );
    }
}

export default HeatingRadiatorsRightPage;
