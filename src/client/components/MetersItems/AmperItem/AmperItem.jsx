import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import ampermeterImg from './amperMeter.svg';

import styles from './AmperItem.css';

export const AmperItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                className={styles.avatar}
                alt="term"
                src={ampermeterImg}
            />
            <ListItemText
                className={styles.item}
                primary={props.name}
                secondary={props.description}
            />
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? (props.value).toFixed(2) : -99.99}
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
