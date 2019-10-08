import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SocketIO from '../../../services/SocketService';

import HeatingRadiatorsLeft  from '../../Animated/Pages/HeatingRadiatorsLeft/HeatingRadiatorsLeft';
import HeatingRadiatorsRight  from '../../Animated/Pages/HeatingRadiatorsRight/HeatingRadiatorsRight';
import ControlContainer  from '../../ControlContainer';

import styles from './HeatingRadiatorsPage.css';

export class HeatingRadiatorsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRightHeatingRadiatorsShown: true
        };

        this.toggleHeatingRadiators = this.toggleHeatingRadiators.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Радиаторы (Родители)');
        this.props.setActiveArea('heatingRadiatorsRight');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }

    toggleHeatingRadiators() {
        const title = this.state.isRightHeatingRadiatorsShown ? 'Радиаторы (Л)' : 'Радиаторы (Родители)' ;
        this.props.setTitle(title);
        if (this.state.isRightHeatingRadiatorsShown ) {
            this.props.setActiveArea('heatingRadiatorsLeft');
        } else {
            this.props.setActiveArea('heatingRadiatorsRight');
        }
        this.setState({
            isRightHeatingRadiatorsShown: !this.state.isRightHeatingRadiatorsShown
        })
    }

    render() {
        const { isRightHeatingRadiatorsShown } = this.state;
        const {
            iT_SO_FO_RIGHT,
            oSP_SO_RIGHT,
            oHEAT_SO_RIGHT,
            iT_ZAL_RIGHT,
            iT_KITCHEN_RIGHT,
            iT_BEDROOM_RIGHT,
            iT_CABINET_RIGHT,
            oSO_ZAL_RIGHT,
            oSO_KITCH_RIGHT,
            oSO_BEDROOM_RIGHT,
            oSO_CABINET_RIGHT,
            oSO_BASE_RIGHT,

            oPUMP_SO_RIGHT,

            iT_SO_FO_LEFT,
            oSP_SO_LEFT,
            oHEAT_SO_LEFT,

            temperatureCabinetLeft,
            temperatureBedroomLeft,
            temperatureD2,
            temperatureD1,
            temperatureKitchenLeft,
            temperatureZalLeft,
            oSO_CABINET_LEFT,
            oSO_BEDROOM_LEFT,
            oSO_D2,
            oSO_D1,
            oSO_KITCH_LEFT,
            oSO_ZAL_LEFT,
            oSO_BASE_LEFT,

            oPUMP_SO_LEFT,

        } = this.props;

        return (
            <div className={styles.container}>
                {
                    isRightHeatingRadiatorsShown ?
                        <HeatingRadiatorsRight
                            oPUMP={oPUMP_SO_RIGHT}
                            oHEAT={oHEAT_SO_RIGHT}
                            iT_FOR={iT_SO_FO_RIGHT}
                            SP_T_FOR={oSP_SO_RIGHT}
                            iT_ZAL={iT_ZAL_RIGHT}
                            iT_KITCHEN={iT_KITCHEN_RIGHT}
                            iT_BEDROOM={iT_BEDROOM_RIGHT}
                            iT_CABINET={iT_CABINET_RIGHT}
                            VLV_ZAL={oSO_ZAL_RIGHT}
                            VLV_KITCHEN={oSO_KITCH_RIGHT}
                            VLV_BEDROOM={oSO_BEDROOM_RIGHT}
                            VLV_CABINET={oSO_CABINET_RIGHT}
                            VLV_BASE={oSO_BASE_RIGHT}
                        />
                        :
                        <HeatingRadiatorsLeft
                            oPUMP={oPUMP_SO_LEFT}
                            oHEAT={oHEAT_SO_LEFT}
                            iT_FOR={iT_SO_FO_LEFT}
                            SP_T_FOR={oSP_SO_LEFT}
                            iT_ZAL={temperatureZalLeft}
                            iT_KITCHEN={temperatureKitchenLeft}
                            iT_BEDROOM={temperatureBedroomLeft}
                            iT_CABINET={temperatureCabinetLeft}
                            iT_D1={temperatureD1}
                            iT_D2={temperatureD2}
                            VLV_ZAL={oSO_ZAL_LEFT}
                            VLV_KITCHEN={oSO_KITCH_LEFT}
                            VLV_BEDROOM={oSO_BEDROOM_LEFT}
                            VLV_CABINET={oSO_CABINET_LEFT}
                            VLV_D1={oSO_D1}
                            VLV_D2={oSO_D2}
                            VLV_BASE={oSO_BASE_LEFT}
                        />
                }
                <Button style={ { margin: '15px' } } variant="contained" color="primary" onClick={this.toggleHeatingRadiators} >
                    {isRightHeatingRadiatorsShown ? 'На Радиаторы (Л)' : 'На Радиаторы (Родители)'}
                </Button>
                <ControlContainer />
            </div>
        );
    }
}

export default HeatingRadiatorsPage;
