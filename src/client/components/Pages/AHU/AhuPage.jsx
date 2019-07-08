import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '@material-ui/core/List';

import AirUnit  from '../../Animated/Pages/AirUnit/AirUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';

import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';

import { setTitle } from '../../../actions/menuActions';
import styles from './AhuPage.css';

export class AhuPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Приточная установка');
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        tFor: findPoint('AI3001122', store.ai),
        tOut: findPoint('AI3000156', store.ai),
        tRet: findPoint('AI3001123', store.ai),
        tIsp: findPoint('AI3001124', store.ai),
        tComp: findPoint('AI3001154', store.ai),
        pFreon: findPoint('AI3001126', store.ai),
        setTemperatureDayHeat: findPoint('AO3001137', store.ao),
        setTemperatureNightHeat: findPoint('AO3001138', store.ao),
        setTemperatureDayCool: findPoint('AO3001139', store.ao),
        setTemperatureNightCool: findPoint('AO3001140', store.ao),
        setDamperMinWinter: findPoint('AO3001142', store.ao),
        setDamperMinSummer: findPoint('AO3001143', store.ao),
        sVSD: findPoint('AO3001136', store.ao),
        sSTART: findPoint('BO3001224', store.bo),
        sSEASON: findPoint('BO3001226', store.bo),
        sLOCAL: findPoint('BO3001233', store.bo),
        sALWAYS: findPoint('BO3001236', store.bo),
        oKKB: findPoint('BI3001200', store.bi),
        oFan: findPoint('BI3001199', store.bi),
        oHeat: findPoint('BI3001202', store.bi),
        oDamperTop: findPoint('BI3001208', store.bi),
        oDamperButtom: findPoint('BI3001209', store.bi),
        aFaza: findPoint('BI3001232', store.bi),
        aPV: findPoint('BI3001213', store.bi),
        aKKB: findPoint('BI3001218', store.bi)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AhuPage);