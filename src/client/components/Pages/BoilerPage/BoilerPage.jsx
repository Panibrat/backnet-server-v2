import * as React from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import BoilerUnit  from '../../Animated/Pages/BoilerUnit/BoilerUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';

import styles from './BoilerPage.css';

export class BoilerPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    Boiler Page
                </div>
                <p style={{textAlign: "center"}}>{window.innerWidth} x {window.innerHeight}</p>
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

export default connect(mapStateToProps)(BoilerPage);