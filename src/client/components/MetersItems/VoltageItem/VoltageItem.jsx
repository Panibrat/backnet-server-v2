import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import voltmeterImg from './voltmeter.svg';

import styles from './VoltageItem.css';

export const VoltageItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                className={styles.avatar}
                alt="term"
                src={voltmeterImg}
            />
            <ListItemText
                className={styles.item}
                primary={props.name}
                secondary={props.description}
            />
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? (props.value).toFixed(1) : (0).toFixed(1)}
                </div>
                <div className={styles.units}>
                    {props.units}
                </div>
            </div>
        </ListItem>
        <li>
            <Divider inset />
        </li>
    </React.Fragment>
);
