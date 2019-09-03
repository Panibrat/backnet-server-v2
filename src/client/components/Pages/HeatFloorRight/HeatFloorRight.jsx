import * as React from 'react';
import SocketIO from '../../../services/SocketService';

import List from '@material-ui/core/List';
import WarmFloorRight  from '../../Animated/Pages/WarmFloorRight/WarmFloorRight';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';
import styles from './HeatFloorRightPage.css';

export class HeatFloorRightPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Теплый пол (Право)');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }

    render() {
        return (
            <div className={styles.container}>
                <WarmFloorRight {...this.props} />
                <div className={styles.values_container}>
                    <List className={styles.list_type}>
                        <BinaryOutputItem {...this.props.sHF_AUTO} />
                        <BinaryOutputItem {...this.props.sSTR_KITCHEN} />
                        <BinaryOutputItem {...this.props.sHF_TCNT} />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogOutputItemSlider
                            {...this.props.sT_HF_FOR}
                            minValue={15}
                            maxValue={40}
                            stepValue={0.5}
                            units={'℃'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.sT_K_MIN}
                            minValue={15}
                            maxValue={40}
                            stepValue={0.5}
                            units={'℃'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.sT_K_MAX}
                            minValue={15}
                            maxValue={40}
                            stepValue={0.5}
                            units={'℃'}
                        />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogInputItem {...this.props.iT_HF_FO} />
                        <AnalogInputItem {...this.props.oSP_HF} />
                        <AnalogInputItem {...this.props.oHEAT_HF} />
                        <AnalogInputItem {...this.props.iT_HF_KITCH} />
                        <AnalogInputItem {...this.props.iT_KITCHEN} />
                    </List>
                    <List>
                        <BinaryInputItem {...this.props.oPUMP_HF} />
                    </List>
                </div>
            </div>
        );
    }
}

export default HeatFloorRightPage;
