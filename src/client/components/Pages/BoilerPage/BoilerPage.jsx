import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '@material-ui/core/List';

import BoilerUnit  from '../../Animated/Pages/BoilerUnit/BoilerUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';

import { setTitle } from '../../../actions/menuActions';
import styles from './BoilerPage.css';

export class BoilerPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Бойлер ГВС');
}
    render() {
        return (
            <div className={styles.container}>
                <BoilerUnit />
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        iT_GVS_R: findPoint('AI3000174', store.ai),

        sT_GVS: findPoint('AO3000209', store.ao),

        oPUMP_BOY: findPoint('BI3000254', store.bi),
        oPUMP_REC: findPoint('BI3000255', store.bi),
        oBOYLER: findPoint('BI3000253', store.bi),

        sSTR_GVS: findPoint('BO3000266', store.bo),
        sS_GVS_R: findPoint('BO3000265', store.bo),
        sTMR_GVS: findPoint('BO3000264', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(BoilerPage);