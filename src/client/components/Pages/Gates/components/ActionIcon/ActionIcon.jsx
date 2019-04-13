import * as React from 'react';
import Button from '@material-ui/core/Button';
import styles from './ActionIcon.css';

export const ActionIcon = (props) => {
    const { imageIcon, name, color, action } = props;
    return (
        <div className={styles.container}>
            <img className={styles.imageIcon}
                 src={imageIcon} alt="" />
            <div className={styles.button}>
                <Button variant="contained" color={color} onClick={action}>
                    { name }
                </Button>
            </div>
        </div>
    );
};
