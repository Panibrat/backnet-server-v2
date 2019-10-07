import React from 'react';
import styles from './ValuePercentTile.css';

const ValuePercentTile = (props) => {
    const { value } = props;
    return (
        <g>
            <rect className={styles.temperaturePlate}
                  x='0'
                  y='0'
                  rx="5px"
                  ry="5px"
                  fill="#ffea00"
                  opacity="0.9"
                  stroke="black"
                  strokeWidth="1px"
                  strokeOpacity="0.5"
            />
            <text className={styles.temperatureText}
                  x="23"
                  y="15"
                  fill="black"
                  opacity="0.9"
                  fontWeight="bold"
            >
                {value + '%'}
            </text>
        </g>
    )
};

export default ValuePercentTile;
