import React from 'react';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import buttonImg from './power.svg';

import styles from './BinaryOutputItem.css';

import SocketIO from '../../services/SocketService';

export default class BinaryOutputItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOn: false };
        this.toggleOutput = this.toggleOutput.bind(this);
    }

    toggleOutput() {
        SocketIO.writeBV({
            title: this.props.title,
            value: !this.props.value
        });
    }

    render() {
        const units = this.props.units ?
            this.props.units
            :
            ['log_off', 'log_on'];
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        alt="button"
                        src={buttonImg}
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
                        <Switch
                            checked={this.props.value}
                            onChange={this.toggleOutput}
                        />
                    </div>
                </ListItem>
                <li>
                    <Divider inset />
                </li>
            </React.Fragment>
        )
    }
}

