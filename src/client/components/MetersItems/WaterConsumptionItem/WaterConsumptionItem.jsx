import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import waterImg from './water-tap.svg';

import styles from './WaterConsumptionItem.css';

export const WaterConsumptionItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                className={styles.avatar}
                alt="power"
                src={waterImg}
            />
            <ListItemText
                className={styles.item}
                primary={props.name}
                secondary={props.description}
            />
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? (props.value/1000).toFixed(3) : -9999.999}
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
