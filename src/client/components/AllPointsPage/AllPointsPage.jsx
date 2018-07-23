import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './AllPointsPage.css';

import AnalogInputsPage from '../AnalogInputsPage/AnalogInputsPage';
import AnalogOutputPage from '../AnalogOutputPage/AnalogOutputPage';
import BinaryInputPage from '../BinaryInputPage/BinaryInputPage';
import BinaryOutputPage from '../BinaryOutputPage/BinaryOutputPage';


export const AllPointsPage = (props) => (
    <React.Fragment>
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
        </Grid>
    </React.Fragment>
);