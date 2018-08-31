import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import thermometerImg from './thermometer.svg';

import styles from './AnalogInputItem.css';

export class AnalogInputItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.value !== nextProps.value);
    }

    render() {
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        className={styles.avatar}
                        alt="term"
                        src={thermometerImg}
                    />
                    <ListItemText
                        className={styles.item}
                        primary={this.props.name}
                        secondary={this.props.description}
                    />
                    <div className={styles.data}>
                        <div className={styles.value}>
                            {this.props.value}
                        </div>
                        <div className={styles.units}>
                            {this.props.units}
                        </div>
                    </div>
                </ListItem>
                <li>
                    <Divider inset/>
                </li>
            </React.Fragment>
        )
    }
}
