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
                        <BinaryOutputItem {...this.props.sSEASON} />
                        <BinaryOutputItem {...this.props.sLOCAL} />
                        <BinaryOutputItem {...this.props.sALWAYS} />
                    </List>
                    <List className={styles.list_type}>
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureDayHeat}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureNightHeat}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureDayCool}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setTemperatureNightCool}
                            minValue={12}
                            maxValue={28}
                            stepValue={0.5}
                            units={'℃'}
                        />
                        <AnalogOutputItemSlider
                            {...this.props.setDamperMinWinter}
                            minValue={0}
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
        tFor: findPoint('AI3000308', store.ai),
        tOut: findPoint('AI3000307', store.ai),
        tRet: findPoint('AI3000309', store.ai),
        tIsp: findPoint('AI3000310', store.ai),
        tComp: findPoint('AI3000359', store.ai),
        pFreon: findPoint('AI3000312', store.ai),
        setTemperatureDayHeat: findPoint('AO3000332', store.ao),
        setTemperatureNightHeat: findPoint('AO3000333', store.ao),
        setTemperatureDayCool: findPoint('AO3000334', store.ao),
        setTemperatureNightCool: findPoint('AO3000335', store.ao),
        setDamperMinWinter: findPoint('AO3000338', store.ao),
        setDamperMinSummer: findPoint('AO3000339', store.ao),
        sSTART: findPoint('BO3000409', store.bo),
        sSEASON: findPoint('BO3000411', store.bo),
        sLOCAL: findPoint('BO3000418', store.bo),
        sALWAYS: findPoint('BO3000421', store.bo),
        oKKB: findPoint('BI3000384', store.bi),
        oFan: findPoint('BI3000382', store.bi),
        oHeat: findPoint('BI3000386', store.bi),
        oDamperTop: findPoint('BI3000392', store.bi),
        oDamperButtom: findPoint('BI3000393', store.bi)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AhuPage);