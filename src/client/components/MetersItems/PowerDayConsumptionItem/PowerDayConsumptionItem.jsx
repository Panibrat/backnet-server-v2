import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import powerImg from './solar-plug.svg';

import styles from './PowerDayConsumptionItem.css';

export const PowerDayConsumptionItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                className={styles.avatar}
                alt="power"
                src={powerImg}
            />
            <ListItemText
                className={styles.item}
                primary={props.name}
                secondary={props.description}
            />
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? Number(props.value).toFixed(1) : (0).toFixed(1)}
                </div>
                <div className={styles.units}>
                    kW*h
                </div>
            </div>
        </ListItem>
        <li>
            <Divider inset />
        </li>
    </React.Fragment>
);
