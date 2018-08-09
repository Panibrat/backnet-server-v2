import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';

import HeatStationUnit  from '../../Animated/Pages/HeatStationUnit/HeatStationUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { setTitle } from '../../../actions/menuActions';
import styles from './HeatStationPage.css';

export class HeatStationPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Котельная');
    }
    render() {
        return (
            <div className={styles.container}>
                <HeatStationUnit />
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

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        iT_SUP: findPoint('AI3000157', store.ai),
        iT_RET: findPoint('AI3000158', store.ai),
        oSP_KOT: findPoint('AI3000171', store.ai),

        oPUMP_EL: findPoint('BI3000279', store.bi),
        oKOTEL: findPoint('BI3000249', store.bi),
        oEL_1X: findPoint('BI3000278', store.bi),
        oEL_2X: findPoint('BI3000277', store.bi),

        sEL_KOTEL: findPoint('BO3000248', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatStationPage);