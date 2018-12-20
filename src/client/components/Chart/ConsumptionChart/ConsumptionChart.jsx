import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './ConsumptionChart.css';

import {
    XYPlot,
    VerticalBarSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis,
} from 'react-vis';


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
            minDate: 0
        };
        this.handleUpdateStartTime = this.handleUpdateStartTime.bind(this);
    }

    componentDidMount() {
        const now = new Date().getTime();
        this.getTrendData(EnergyDayTotal, now - day, now)
            .then((response) => {
                console.log('response.data', response.data);
                this.setState({
                    EnergyDayTotal: this.convertDataToRelative(response.data),
                    minDate: Math.max(response.data[0].x, now - day, this.state.minDate),
                });
            });

        this.getTrendData(EnergyNightTotal, now - day, now)
            .then((response) => {
                console.log('this.convertDataToRelative(response.data)', this.convertDataToRelative(response.data));
                this.setState({
                    EnergyNightTotal: this.convertDataToRelative(response.data),
                    minDate: Math.max(response.data[0].x, now - day, this.state.minDate),
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
        const startFrom = now - hours * 3600 * 1000;
        this.getTrendData(EnergyDayTotal, startFrom, now)
            .then((response) => {
                this.setState({
                    EnergyDayTotal: this.convertDataToRelative(response.data),
                    minDate: startFrom,
                });
            });
        this.getTrendData(EnergyNightTotal, startFrom, now)
            .then((response) => {
                this.setState({
                    EnergyNightTotal: this.convertDataToRelative(response.data),
                    minDate: startFrom,
                });
            });
    }

    render() {
        const now = new Date().getTime();
        return (
            <div>
                <XYPlot width={360} height={300} xDomain={[this.state.minDate, now]} xType={'time'}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    <VerticalBarSeries   data={this.state.EnergyDayTotal} color={'orange'} />
                    <VerticalBarSeries   data={this.state.EnergyNightTotal} color={'blue'} />
                    <XAxis title="time" />
                    <YAxis title={"kW"} />
                </XYPlot>
                <button onClick={() => this.handleUpdateStartTime(1/60) }>- 1min</button>
                <button onClick={() => this.handleUpdateStartTime(1) }>- 1h</button>
                <button onClick={() => this.handleUpdateStartTime(24) }>- 24h</button>
                <button onClick={() => this.handleUpdateStartTime(7*24) }>- 7d</button>
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
