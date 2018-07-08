import * as React from 'react';
import SocketIO from '../../services/SocketService';
import { connect } from 'react-redux';

import AnalogOutputItem from '../AnalogOutputItem/AnalogOutputItem';

import { Fan } from '../Animated/Fan/Fan';
import { Spin } from '../Animated/Spin/Spin';


import styles from './AnalogOutputPage.css';

export class AnalogOutputPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFanOn: false };
        this.toggleFan = this.toggleFan.bind(this);
    }

    componentDidMount() {
        console.log('this.props', this.props);
        SocketIO.sendAO();
    }

    toggleFan() {
        this.setState({ isFanOn: !this.state.isFanOn });

    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Spin</h1>
                <Spin />
                <h1>Analog Output Page</h1>
                <Fan isOn={this.state.isFanOn}/>
                <button onClick={this.toggleFan} >
                    ON/OFF
                </button>
                { this.props.ao.map((ai) =>
                    <AnalogOutputItem
                        key={ai.title}
                        title={ai.title}
                        description={ai.description}
                        value={ai.value}
                        units={ai.units}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        ao: store.ao
    }
};

export default connect(mapStateToProps)(AnalogOutputPage);