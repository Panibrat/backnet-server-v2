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
                primary={'PowerDay'}
                secondary={'Потребление энергии. День.'}
            />
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? (props.value).toFixed(3) : -9999.999}
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
