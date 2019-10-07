import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SocketIO from '../../../services/SocketService';

import HeatFloorRight  from '../../Animated/Pages/HeatFloorRight/HeatFloorRight';
import HeatFloorLeft  from '../../Animated/Pages/HeatFloorLeft/HeatFloorLeft';
import ControlContainer  from '../../ControlContainer';

import styles from './HeatFloorsPage.css';

export class HeatFloorsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRightHeatFloorShown: true
        };

        this.toggleHeatFloor = this.toggleHeatFloor.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Теплый пол (Родители)');
        this.props.setActiveArea('heatFloorRight');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }

    toggleHeatFloor() {
        const title = this.state.isRightHeatFloorShown ? 'Теплый пол (Л)' : 'Теплый пол (Родители)' ;
        this.props.setTitle(title);
        if (this.state.isRightHeatFloorShown ) {
            this.props.setActiveArea('heatFloorLeft');
        } else {
            this.props.setActiveArea('heatFloorRight');
        }
        this.setState({
            isRightHeatFloorShown: !this.state.isRightHeatFloorShown
        })
    }

    render() {
        const { isRightHeatFloorShown } = this.state;
        const {
            iT_HF_FO_RIGHT,
            oSP_HF_RIGHT,
            oHEAT_HF_RIGHT,
            temperatureHFKitchenRight,
            temperatureKitchenRight,
            oPUMP_HF_RIGHT,

            iT_HF_FO_LEFT,
            oSP_HF_LEFT,
            oHEAT_HF_LEFT,

            temperatureZalLeft,
            temperatureKitchenLeft,
            temperatureHFKitchenLeft,
            temperatureHFWC1Left,
            temperatureHFHallLeft,
            temperatureHFZal_L_Left,
            temperatureHFZal_R_Left,
            temperatureHFWC2Left,

            valveHF_kitchen_Left,
            valveHF_hall_Left,
            valveHF_WC1_Left,
            valveHF_WC2_Left,
            valveHF_zal_Right,
            valveHF_zal_Left,

            oPUMP_HF_LEFT,
        } = this.props;

        return (
            <div className={styles.container}>
                {
                    isRightHeatFloorShown ?
                        <HeatFloorRight
                            oPUMP={oPUMP_HF_RIGHT}
                            oHEAT={oHEAT_HF_RIGHT}
                            iT_FOR={iT_HF_FO_RIGHT}
                            SP_T_FOR={oSP_HF_RIGHT}
                            iT_HF_KITCHEN={temperatureHFKitchenRight}
                            iT_KITCHEN={temperatureKitchenRight}
                        />
                        :
                        <HeatFloorLeft
                            oPUMP={oPUMP_HF_LEFT}
                            oHEAT={oHEAT_HF_LEFT}
                            iT_FOR={iT_HF_FO_LEFT}
                            SP_T_FOR={oSP_HF_LEFT}
                            iT_KITCHEN={temperatureKitchenLeft}
                            iT_HF_KITCHEN={temperatureHFKitchenLeft}
                            iT_HF_HALL={temperatureHFHallLeft}
                            iT_HF_WC1={temperatureHFWC1Left}
                            iT_HF_WC2={temperatureHFWC2Left}
                            iT_HF_ZAL_R={temperatureHFZal_R_Left}
                            iT_HF_ZAL_L={temperatureHFZal_L_Left}
                            iT_ZAL={temperatureZalLeft}
                            oVLV_KITCHEN={valveHF_kitchen_Left}
                            oVLV_HALL={valveHF_hall_Left}
                            oVLV_WC1={valveHF_WC1_Left}
                            oVLV_WC2={valveHF_WC2_Left}
                            oVLV_ZAL_R={valveHF_zal_Right}
                            oVLV_ZAL_L={valveHF_zal_Left}
                        />
                }
                <Button style={ { margin: '15px' } } variant="contained" color="primary" onClick={this.toggleHeatFloor} >
                    {isRightHeatFloorShown ? 'На Теплый пол (Л)' : 'На Теплый пол (Родители)'}
                </Button>
                <ControlContainer />
            </div>
        );
    }
}

export default HeatFloorsPage;
