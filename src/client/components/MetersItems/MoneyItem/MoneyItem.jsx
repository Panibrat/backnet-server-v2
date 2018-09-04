import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import moneyImg from './money.svg';

import styles from './MoneyItem.css';

export const MoneyItem = (props) => (
    <React.Fragment>
        <ListItem className={styles.container}>
            <Avatar
                className={styles.avatar}
                alt="term"
                src={moneyImg}
            />
            <ListItemText
                className={styles.item}
                primary={props.name}
                secondary={props.description}
            />
            <div className={styles.data}>
                <div className={styles.value}>
                    {props.value ? (props.value * props.multiple).toFixed(2) : (0).toFixed(2)}
                </div>
                <div className={styles.units}>
                    UAH
                </div>
            </div>
        </ListItem>
        <li>
            <Divider inset />
        </li>
    </React.Fragment>
);
