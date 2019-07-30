import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { ActionIcon } from './components/ActionIcon/ActionIcon';
import SocketIO from '../../../services/SocketService';
import styles from './Gates.css';

import frontGateClosed from './components/img/frontGateClosed.svg';
import frontGateOpen from './components/img/frontGateOpen.svg';
import lightBulbIcon from './components/img/lightBulbIcon.svg';

const sLightOut = 'BO3000873';
const sDoorOpn = 'BO3000874';
const sGateOpn = 'BO3000875';
const oGateCls = 'BO3000876';

class Gates extends React.Component {
    constructor() {
        super();
        this.sendImpulse = this.sendImpulse.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Ворота/Калитка');
    }

    sendImpulse(title) {
        SocketIO.writeBO({
            title,
            value: true,
        });
        const timeOutId = setTimeout(() => {
            SocketIO.writeBO({
                title,
                value: false,
            });
            clearTimeout(timeOutId);
        }, 3000);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <h5>Ворота</h5>
                </div>
                <div className={styles.gateContainer}>
                    <ActionIcon
                        imageIcon={frontGateClosed}
                        name="Close"
                        color="secondary"
                        action={() => {
                            this.sendImpulse(oGateCls)
                        }}
                    />
                    <ActionIcon
                        imageIcon={frontGateOpen}
                        name="Open"
                        color="primary"
                        action={() => {
                            this.sendImpulse(sGateOpn)
                        }}
                    />
                </div>
                <div className={styles.doorContainer}>
                </div>
                <div className={styles.title}>
                    <h5>Калитка</h5>
                </div>
                <div className={styles.doorContainer}>
                    <ActionIcon
                        imageIcon={frontGateOpen}
                        name="Open"
                        color="primary"
                        action={() => {
                            this.sendImpulse(sDoorOpn)
                        }}/>
                </div>
                <div className={styles.title}>
                    <h5>Свет моргни</h5>
                </div>
                <div className={styles.doorContainer}>
                    <ActionIcon
                        imageIcon={lightBulbIcon}
                        name="Pulse"
                        color="primary"
                        action={() => {
                            this.sendImpulse(sLightOut)
                        }}/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(Gates);
