import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import switchOffImg from './switch.svg';
import switchOnImg from './switchOn.svg';

import styles from './BinaryInputItem.css';

export const BinaryInputItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                alt="switch"
                src={props.value ? switchOnImg : switchOffImg}
            />
            <ListItemText primary={props.title} secondary={props.description}/>
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? props.units[1] : props.units[0]}
                </div>
            </div>
        </ListItem>
        <li>
            <Divider inset />
        </li>
    </React.Fragment>
);
