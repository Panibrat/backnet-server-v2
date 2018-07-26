import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './AllPointsPage.css';

import AnalogInputsPage from '../AnalogInputsPage/AnalogInputsPage';
import AnalogOutputPage from '../AnalogOutputPage/AnalogOutputPage';
import AnalogValuePage from '../AnalogValuePage/AnalogValuePage'
import BinaryInputPage from '../BinaryInputPage/BinaryInputPage';
import BinaryOutputPage from '../BinaryOutputPage/BinaryOutputPage';
import BinaryValuePage from '../BinaryValuePage/BinaryValuePage';


export const AllPointsPage = (props) => (
    <div className={styles.container}>
        <h1>All Points Page </h1>
        <Grid container={true}>
            <Grid item={true}>
                <AnalogInputsPage />
            </Grid>
            <Grid item={true}>
                <AnalogOutputPage />
            </Grid>
            <Grid item={true}>
                <BinaryInputPage />
            </Grid>
            <Grid item={true}>
                <BinaryOutputPage />
            </Grid>
            <Grid item={true}>
                <BinaryValuePage />
            </Grid>
            <Grid item={true}>
                <AnalogValuePage />
            </Grid>
        </Grid>
    </div>
);