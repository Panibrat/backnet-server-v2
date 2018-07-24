import * as React from 'react';
import List from '@material-ui/core/List';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';

import { AnalogOutputItem } from '../AnalogOutputItem/AnalogOutputItem';

import { Fan } from '../Animated/Fan/Fan';
import { Spin } from '../Animated/Spin/Spin';


import styles from './AnalogOutputPage.css';

export class AnalogOutputPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isFanOn: false };
        this.toggleFan = this.toggleFan.bind(this);
        this.toggleFanWithDelay = this.toggleFanWithDelay.bind(this);
    }

    componentDidMount() {
        //console.log('this.props', this.props);
    }

    toggleFan() {
        this.setState({ isFanOn: !this.state.isFanOn });
    }

    toggleFanWithDelay() {
        const self = this;
        setTimeout(() => self.toggleFan(), 3000);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Analog Output Page
                </div>
                { this.props.ao.map((ao) =>
                    <AnalogOutputItem
                        key={ao.title}
                        title={ao.title}
                        name={ao.name}
                        description={ao.description}
                        value={ao.value}
                        units={ao.units}
                    />
                )}
                <h1>Spin</h1>
                <Spin />
                <Fan isOn={this.state.isFanOn}/>
                <Switch
                    checked={this.state.isFanOn}
                    onChange={this.toggleFanWithDelay}
                />
                <button onClick={this.toggleFan} >
                    ON/OFF
                </button>
            </List>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        ao: store.ao
    }
};

export default connect(mapStateToProps)(AnalogOutputPage);