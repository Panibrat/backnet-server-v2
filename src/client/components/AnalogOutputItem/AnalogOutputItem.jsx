import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import voltageImg from './voltage.svg';

import styles from './AnalogOutputItem.css';

export const AnalogOutputItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                alt="term"
                src={voltageImg}
            />
            <ListItemText primary={props.title} secondary={props.description}/>
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value}
                </div>
                <div className={styles.units}>
                    {props.units}
                </div>
            </div>
        </ListItem>
        <li>
            <Divider inset/>
        </li>
    </React.Fragment>
);
