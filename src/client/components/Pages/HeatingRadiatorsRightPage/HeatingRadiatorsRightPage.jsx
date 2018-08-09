import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';

import HeatingRadiatorsRight  from '../../Animated/Pages/HeatingRadiatorsRight/HeatingRadiatorsRight';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';
import { setTitle } from '../../../actions/menuActions';
import styles from './HeatingRadiatorsRightPage.css';

export class HeatingRadiatorsRightPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Радиаторное отопление');
    }
    render() {
        return (
            <div className={styles.container}>
                <HeatingRadiatorsRight />
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        iT_SO_FO: findPoint('AI3000159', store.ai),
        oSP_SO: findPoint('AI3000169', store.ai),
        oHEAT_SO: findPoint('AI3000161', store.ai),
        iT_KITCHEN: findPoint('AI3000160', store.ai),
        iT_ZAL: findPoint('AI3000172', store.ai),
        iT_CABINET: findPoint('AI3000187', store.ai),
        iT_BEDROOM: findPoint('AI3000179', store.ai),
        oSO_ZAL: findPoint('AI3000164', store.ai),
        oSO_KITCH: findPoint('AI3000163', store.ai),
        oSO_BEDROOM: findPoint('AI3000165', store.ai),
        oSO_CABINET: findPoint('AI3000166', store.ai),
        oSO_BASE: findPoint('AI3000162', store.ai),

        sT_SO_FOR: findPoint('AO3000206', store.ao),

        oPUMP_SO: findPoint('BI3000247', store.bi),

        sSTR_SO: findPoint('BO3000262', store.bo),
        sSO_AUTO: findPoint('BO3000263', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatingRadiatorsRightPage);