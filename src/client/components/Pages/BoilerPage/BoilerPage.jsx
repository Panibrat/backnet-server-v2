import * as React from 'react';
import SocketIO from '../../../services/SocketService';

import List from '@material-ui/core/List';

import BoilerUnit  from '../../Animated/Pages/BoilerUnit/BoilerUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';

import styles from './BoilerPage.css';

export class BoilerPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Бойлер ГВС');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
}
    render() {
        return (
            <div className={styles.container}>
                <BoilerUnit {...this.props} />
                <div className={styles.values_container}>
                    <List className={styles.list_type}>
                        <BinaryOutputItem {...this.props.sSTR_GVS} />
                        <BinaryOutputItem {...this.props.sS_GVS_R} />
                        <BinaryOutputItem {...this.props.sTMR_GVS} />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogOutputItemSlider
                            {...this.props.sT_GVS}
                            minValue={15}
                            maxValue={65}
                            stepValue={1}
                            units={'℃'}
                        />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogInputItem {...this.props.iT_GVS_R} />
                    </List>
                    <List>
                        <BinaryInputItem {...this.props.oPUMP_BOY} />
                        <BinaryInputItem {...this.props.oPUMP_REC} />
                        <BinaryInputItem {...this.props.oBOYLER} />
                    </List>
                </div>
            </div>
        );
    }
}

export default BoilerPage;
