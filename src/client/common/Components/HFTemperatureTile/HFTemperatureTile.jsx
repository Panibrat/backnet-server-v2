import React from 'react';
import styles from './HFTemperatureTile.css';

const HFTemperatureTile = (props) => {
    const { temperature } = props;
    return (
        <g>
            <rect className={styles.temperaturePlate} x='0' y='0' rx="5px" ry="5px" />
            <text className={styles.temperatureText} x="21" y="14" >{temperature + '°C'}</text>
        </g>
    )
};

export default HFTemperatureTile;