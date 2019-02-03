import React from 'react';
import styles from './TemperatureTile.css';

const TemperatureTile = (props) => {
    const { temperature } = props;
    return (
        <g>
            <rect className={styles.temperaturePlate} x='0' y='0' rx="5px" ry="5px" width="50" height="20" fill="white" opacity="0.5" stroke="black" strokeWidth="1px" strokeOpacity="0.5" />
            <text className={styles.temperatureText} x="27" y="15" fill="black" opacity="0.85">{temperature + '°C'}</text>
        </g>
    )
}

export default TemperatureTile;