import * as React from 'react';
import styles from './Coil.css';
import heatCoilImage from './heat-coil.svg';
import coldCoilImage from './cold-coil.svg';

export const Coil = (props) => (
    <div className={styles.container}>
        <img className={styles.coil}
            src={props.isHeat ? heatCoilImage : coldCoilImage}
        />
    </div>
);
