import React from 'react';
import styles from './TemperatureTile.css';

const TemperatureTile = (props) => {
    const { temperature } = props;
    return (
        <g>
            <rect className={styles.temperaturePlate}
                  x='0'
                  y='0'
                  rx="5px"
                  ry="5px"
                  width="50"
                  height="20"
                  fill={props.plateColor ? props.plateColor : "black"}
                  opacity={props.plateOpacity ? props.plateOpacity : "0.7"}
                  stroke={props.strokeColor ? props.strokeColor : "white"}
                  strokeWidth="1px"
                  strokeOpacity="0.5"
            />
            <text className={styles.temperatureText}
                  x="27"
                  y="15"
                  fill={props.textColor ? props.textColor : "white"}
                  opacity={props.textOpacity ? props.textOpacity : "0.85"}
                  fontWeight={props.fontWeight ? props.fontWeight : "normal"}
            >
                {temperature + '°C'}
            </text>
        </g>
    )
}

export default TemperatureTile;