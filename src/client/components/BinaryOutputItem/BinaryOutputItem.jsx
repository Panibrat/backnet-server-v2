import React from 'react';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
// import buttonImg from './power.svg';
import buttonOffImg from './Red_Power_Button_clip_art.svg';
import buttonOnImg from './Green_Power_Button_clip_art.svg';
import coolingImg from './snowflake.svg';
import heatingImg from './sun.svg';
import pc from './pc.svg';
import thermostat from './thermostat.svg';

import styles from './BinaryOutputItem.css';

import SocketIO from '../../services/SocketService';

const config = {
    offOn: [buttonOffImg, buttonOnImg],
    coolHeat: [coolingImg, heatingImg],
    control: [thermostat, pc],
};

export default class BinaryOutputItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: null,
        };
        this.toggleOutput = this.toggleOutput.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if ((state.isOn === null) && (props.value !== undefined)) {
            return { isOn: props.value }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const result = (this.props.value !== nextProps.value) || (this.state.isOn !== nextState.isOn);
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value !== this.state.isOn && prevProps.value !== this.props.value) {
            this.setState({ isOn: this.props.value });
        }
    }

    toggleOutput() {
        SocketIO.writeBO({
            title: this.props.title,
            value: !this.state.isOn,
        });
        this.setState({ isOn: !this.state.isOn });
    }

    render() {
        const { icons } = this.props;
        const iconsImages = icons ? config[icons] : config['offOn'];
        const units = this.props.units ?
            this.props.units
            :
            ['log_off', 'log_on'];
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        className={styles.avatar}
                        alt="button"
                        src={this.props.value ? iconsImages[1] : iconsImages[0]}
                    />
                    <ListItemText
                        className={styles.item}
                        primary={this.props.name}
                        secondary={this.props.description}/>
                    <div className={styles.data}>
                        <div className={styles.value}>
                            {
                                this.props.value ?
                                    units[1]
                                    :
                                    units[0]
                            }
                        </div>
                        {
                            (this.state.isOn !== null) && (
                                <Switch
                                    checked={this.state.isOn}
                                    onChange={this.toggleOutput}
                                    color='primary'
                                />
                            )
                        }
                    </div>
                </ListItem>
                <li>
                    <Divider inset />
                </li>
            </React.Fragment>
        )
    }
}


