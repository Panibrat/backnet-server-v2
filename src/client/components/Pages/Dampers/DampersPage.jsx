import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from '@material-ui/core/List';

import  AirDuct  from '../../Animated/Pages/AirDuct/AirDuct';
import { AnalogOutputItemSlider } from '../../AnalogOutputItemSlider/AnalogOutputItemSlider';
import { setTitle } from '../../../actions/menuActions';
import styles from './DampersPage.css';

export class DampersPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Воздушные заслонки');
    }
    render() {
        return (
            <div className={styles.container}>
                <AirDuct />
                <List>
                    <AnalogOutputItemSlider
                        {...this.props.sD_L_K_B}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_D1_D2}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_R_K_B}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_R_ZAL}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                    <AnalogOutputItemSlider
                        {...this.props.sD_L_ZAL}
                        minValue={0}
                        maxValue={100}
                        stepValue={5}
                        units={'%'}
                    />
                </List>
            </div>
        );
    }
}

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index]
}

const mapStateToProps = (store) => {
    return {
        sD_L_K_B: findPoint('AO3001146', store.ao),
        sD_D1_D2: findPoint('AO3001147', store.ao),
        sD_R_K_B: findPoint('AO3001148', store.ao),
        sD_R_ZAL: findPoint('AO3001149', store.ao),
        sD_L_ZAL: findPoint('AO3001150', store.ao)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(DampersPage);