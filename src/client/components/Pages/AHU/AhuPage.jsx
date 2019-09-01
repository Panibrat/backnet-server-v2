import * as React from 'react';
import SocketIO from '../../../services/SocketService';

import List from '@material-ui/core/List';

import AirUnit  from '../../Animated/Pages/AirUnit/AirUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';

import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';

import styles from './AhuPage.css';

export class AhuPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Приточная установка');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }
    render() {
        return (
            <div className={styles.container}>
                <AirUnit />
                <div className={styles.values_container}>
                    <List className={styles.list_type}>
                        <BinaryOutputItem {...this.props.sSTART} />
                        <BinaryOutputItem icons={'coolHeat'} {...this.props.sSEASON} />
                        <BinaryOutputItem icons={'control'} {...this.props.sLOCAL} />
                        <BinaryOutputItem {...this.props.sALWAYS} />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureDayHeat}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                            icons={'setTemperature'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureNightHeat}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                            icons={'setTemperature'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureDayCool}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                            icons={'setTemperature'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureNightCool}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                            icons={'setTemperature'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setDamperMinWinter}
                            minValue={0}
                            maxValue={100}
                            stepValue={5}
                            units={'%'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.sVSD}
                            minValue={50}
                            maxValue={100}
                            stepValue={5}
                            units={'%'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setDamperMinSummer}
                            minValue={0}
                            maxValue={100}
                            stepValue={5}
                            units={'%'}
                        />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogInputItem {...this.props.tFor} />
                        <AnalogInputItem {...this.props.tOut} />
                        <AnalogInputItem {...this.props.tRet} />
                        <AnalogInputItem {...this.props.tIsp} />
                        <AnalogInputItem {...this.props.tComp} />
                        <AnalogInputItem {...this.props.pFreon} />
                    </List>
                    <List>
                        <BinaryInputItem {...this.props.oKKB} />
                        <BinaryInputItem {...this.props.oFan} />
                        <BinaryInputItem {...this.props.oHeat} />
                        <BinaryInputItem {...this.props.oDamperTop} />
                        <BinaryInputItem {...this.props.oDamperButtom} />
                    </List>
                    <List>
                        <BinaryInputItem icons={'normalAlarm'} {...this.props.aKKB} />
                        <BinaryInputItem icons={'normalAlarm'} {...this.props.aFaza} />
                        <BinaryInputItem icons={'normalAlarm'} {...this.props.aPV} />
                    </List>
                </div>
            </div>
        );
    }
}

export default AhuPage;