import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import switchOffImg from './switch.svg';
import switchOnImg from './switchOn.svg';
import warning from './warning2.svg';
import ok2 from './ok2.svg';

import styles from './BinaryInputItem.css';

const config = {
    offOn: [switchOffImg, switchOnImg],
    normalAlarm: [ok2, warning],
};

export class BinaryInputItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.value !== nextProps.value);
    }

    render() {
        const { icons } = this.props;
        const iconsImages = icons && config[icons] ? config[icons] : config['offOn'];
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        className={styles.avatar}
                        alt="switch"
                        src={this.props.value ? iconsImages[1] : iconsImages[0]}
                    />
                    <ListItemText
                        className={styles.item}
                        primary={this.props.name}
                        secondary={this.props.description}
                    />
                    <div className={styles.data}>
                        {
                            this.props.units ?
                                <div className={styles.value}>
                                    {this.props.value ? this.props.units[1] : this.props.units[0]}
                                </div>
                                :
                                null
                        }
                    </div>
                </ListItem>
                <li>
                    <Divider inset />
                </li>
            </React.Fragment>
        )
    }
}
