import React from 'react';
import styles from './TextTile.css';

const TextTile = (props) => {
    const { text } = props;
    return (
        <g>
            <text className={styles.temperatureText}
                  x="0"
                  y="0"
                  fill="black"
                  opacity="0.8"
                  fontWeight="bold"
            >
                {text}
            </text>
        </g>
    )
};

export default TextTile;
