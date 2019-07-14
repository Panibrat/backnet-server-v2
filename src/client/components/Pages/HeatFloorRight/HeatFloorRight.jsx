import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';

import WarmFloorRight  from '../../Animated/Pages/WarmFloorRight/WarmFloorRight';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';
import { setTitle } from '../../../actions/menuActions';
import styles from './HeatFloorRightPage.css';

export class HeatFloorRightPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Теплый пол (Право)');
    }
    render() {
        return (
            <div className={styles.container}>
                <WarmFloorRight />
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        iT_HF_FO: findPoint('AI3000178', store.ai),
        oSP_HF: findPoint('AI3000181', store.ai),
        oHEAT_HF: findPoint('AI3000182', store.ai),
        iT_HF_KITCH: findPoint('AI3000177', store.ai),
        iT_KITCHEN: findPoint('AI3000160', store.ai),
        oHF_WC1: 0,
        oHF_WC2: 0,
        oHF_KITCH: findPoint('AI3000185', store.ai),
        oHF_HALL: 0,

        sT_HF_FOR: findPoint('AO3000219', store.ao),
        sT_K_MIN: findPoint('AO3000234', store.ao),
        sT_K_MAX: findPoint('AO3000235', store.ao),

        oPUMP_HF: findPoint('BI3000261', store.bi),

        sHF_AUTO: findPoint('BO3000267', store.bo),
        sSTR_KITCHEN: findPoint('BO3000882', store.bo),
        sHF_TCNT: findPoint('BO3000283', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatFloorRightPage);