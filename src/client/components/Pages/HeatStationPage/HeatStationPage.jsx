import * as React from 'react';
import List from '@material-ui/core/List';

import HeatStationUnit  from '../../Animated/Pages/HeatStationUnit/HeatStationUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import SocketIO from '../../../services/SocketService';
import styles from './HeatStationPage.css';

export class HeatStationPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Котельная');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }
    render() {
        return (
            <div className={styles.container}>
                <HeatStationUnit {...this.props } />
                <div className={styles.values_container}>
                    <List className={styles.list_type}>
                        <BinaryOutputItem {...this.props.sEL_KOTEL} />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogInputItem {...this.props.oSP_KOT} />
                        <AnalogInputItem {...this.props.iT_SUP} />
                        <AnalogInputItem {...this.props.iT_RET} />
                    </List>
                    <List>
                        <BinaryInputItem {...this.props.oKOTEL} />
                        <BinaryInputItem {...this.props.oPUMP_EL} />
                        <BinaryInputItem {...this.props.oEL_1X} />
                        <BinaryInputItem {...this.props.oEL_2X} />
                    </List>
                </div>
            </div>
        );
    }
}

export default HeatStationPage;
