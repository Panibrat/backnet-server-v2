import * as React from 'react';
import Button from '@material-ui/core/Button';
import SocketIO from '../../../services/SocketService';

import BoilerUnit  from '../../Animated/Pages/BoilerUnit/BoilerUnit';
import ControlContainer  from '../../ControlContainer';

import styles from './BoilerPage.css';

export class BoilerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRightBoilerShown: true
        };

        this.toggleBoiler = this.toggleBoiler.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Бойлер ГВС (Родители)');
        this.props.setActiveArea('boilerRight');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
    }

    toggleBoiler() {
        const title = this.state.isRightBoilerShown ? 'Бойлер ГВС (Л)' : 'Бойлер ГВС (Родители)' ;
        this.props.setTitle(title);
        if (this.state.isRightBoilerShown ) {
            this.props.setActiveArea('boilerLeft');
        } else {
            this.props.setActiveArea('boilerRight');
        }
        this.setState({
            isRightBoilerShown: !this.state.isRightBoilerShown
        })
    }

    render() {
        const { isRightBoilerShown } = this.state;
        const {
            sT_GVS_R,
            iT_GVS_R,
            oPUMP_BOY_R,
            oPUMP_REC_R,
            oBOYLER_R,
            sT_GVS_L,
            iT_GVS_L,
            oPUMP_BOY_L,
            oPUMP_REC_L,
            oBOYLER_L,
        } = this.props;

        return (
            <div className={styles.container}>
                {
                    isRightBoilerShown ?
                        <BoilerUnit
                            oPUMP_REC={oPUMP_REC_R}
                            oPUMP_BOY={oPUMP_BOY_R}
                            oBOYLER={oBOYLER_R}
                             iT_GVS={iT_GVS_R}
                             sT_GVS={sT_GVS_R}
                        />
                        :
                        <BoilerUnit
                            oPUMP_REC={oPUMP_REC_L}
                            oPUMP_BOY={oPUMP_BOY_L}
                            oBOYLER={oBOYLER_L}
                            iT_GVS={iT_GVS_L}
                            sT_GVS={sT_GVS_L}
                        />
                }
                <Button style={ { margin: '15px' } } variant="contained" color="primary" onClick={this.toggleBoiler} >
                    {isRightBoilerShown ? 'На Бойлер ГВС (Л)' : 'На Бойлер ГВС (Родители)'}
                </Button>
                <ControlContainer />
            </div>
        );
    }
}

export default BoilerPage;
