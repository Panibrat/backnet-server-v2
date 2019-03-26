import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { BarChart } from '../BarConsumptionChart/BarChart';

import styles from'./ConsumptionChart.css';

const minute = 1000 * 60;
const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;

const EnergyDayTotal = 'EnergyDayTotal';
const EnergyNightTotal = 'EnergyNightTotal';

class ConsumptionChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EnergyDayTotal: [],
            EnergyNightTotal: [],
            startTime: 0,
            startTimeShift: 24,
        };
        this.handleUpdateStartTime = this.handleUpdateStartTime.bind(this);
    }

    componentDidMount() {
        const now = new Date().getTime();
        this.getTrendData(EnergyDayTotal, now - day - hour, now)
            .then((response) => {
                console.log('response.data', response.data);
                this.setState({
                    EnergyDayTotal: this.convertDataToRelative(response.data),
                    startTime: Math.max(response.data[0].x, now - day - hour, this.state.startTime),
                });
            });

        this.getTrendData(EnergyNightTotal, now - day - hour, now)
            .then((response) => {
                console.log('this.convertDataToRelative(response.data)', this.convertDataToRelative(response.data));
                this.setState({
                    EnergyNightTotal: this.convertDataToRelative(response.data),
                    startTime: Math.max(response.data[0].x, now - day - hour, this.state.startTime),
                });
            });
    }


    getTrendData(title, startTime, endTime) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/consumption', {
                title: title,
                startTime: startTime,
                endTime: endTime
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth": token,
                }
            }
        )
    }

    convertDataToRelative(dataArray) {
        return dataArray.reduce((previousValue, currentItem, index, arr) => {
            if (index > 0) {
                const relativeValue = arr[index].y - arr[index - 1].y;
                previousValue.push({ x: currentItem.x, y: relativeValue });
                return previousValue;
            }
            return previousValue;
        }, []);
    }

    handleUpdateStartTime(hours) {
        const now = new Date().getTime();
        const startFrom = now - hours * 3600 * 1000 - hour;
        this.getTrendData(EnergyDayTotal, startFrom, now)
            .then((response) => {
                this.setState({
                    EnergyDayTotal: this.convertDataToRelative(response.data),
                    startTime: startFrom,
                    startTimeShift: hours,
                });
            });
        this.getTrendData(EnergyNightTotal, startFrom, now)
            .then((response) => {
                this.setState({
                    EnergyNightTotal: this.convertDataToRelative(response.data),
                    startTime: startFrom,
                });
            });
    }

    render() {
        const {EnergyDayTotal, EnergyNightTotal, startTime, startTimeShift} = this.state;
        const now = new Date().getTime();
        return (
            <div>
                <BarChart
                    startTime={startTime}
                    endTime={now}
                    EnergyDayTotal={EnergyDayTotal}
                    EnergyNightTotal={EnergyNightTotal}
                />
                <div className={styles.timeSetButtonsGroup}>
                    <Button
                        className={styles.timeSetButton}
                        variant={startTimeShift === 4 ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleUpdateStartTime(4) }>
                        - 4h
                    </Button>
                    <Button
                        className={styles.timeSetButton}
                        variant={startTimeShift === 12 ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleUpdateStartTime(12) }>
                        - 12h
                    </Button>
                    <Button
                        className={styles.timeSetButton}
                        variant={startTimeShift === 24 ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleUpdateStartTime(24) }>
                        - 24h
                    </Button>
                    <Button
                        className={styles.timeSetButton}
                        variant={startTimeShift === 7*24 ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleUpdateStartTime(7*24) }>
                        - 7d
                    </Button>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(ConsumptionChart);
