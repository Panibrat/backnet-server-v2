import React, {Component} from 'react';
import Switch from '@material-ui/core/Switch';
import styles from './ChartItemButton.css';

export class ChartItemButton extends Component {
    render () {
        const { title, name, description, color, callBack, points } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.itemColor} style={{ backgroundColor: `${color}` }}></div>
                <div className={styles.itemName} >{name}</div>
                <div className={styles.itemDescription} >{description}</div>
                <Switch
                    className={styles.itemSwitch}
                    checked={(points && points.indexOf(title) !== -1)}
                    onChange={() => callBack(title)}
                    color='primary'
                />
            </div>
        )
    }
}
