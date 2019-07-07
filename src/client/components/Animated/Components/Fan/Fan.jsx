import * as React from 'react';
import styles from './Fan.css';
import fanImage from'./fan.svg';

export const Fan = (props) => (
    <div className="fan">
        <img className={props.isOn
            ? styles.rotating
            : null}
             src={fanImage} alt="" />
    </div>
);
