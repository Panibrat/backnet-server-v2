import React, { Component } from 'react';
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

class ConsumptionChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AV3000730: [],
            AV3000731: [],
            minDate: 0
        };
        this.handleUpdateStartTime = this.handleUpdateStartTime.bind(this);
    }

    componentDidMount() {
        const now = new Date().getTime();
        this.getTrendData('AV3000730', now - day, now)
            .then((response) => {
                console.log('response.data', response.data);
                this.setState({
                    AV3000730: this.convertDataToRelative(response.data),
                    minDate: Math.max(response.data[0].x, now - day, this.state.minDate),
                });
            });

        this.getTrendData('AV3000731', now - day, now)
            .then((response) => {
                console.log('this.convertDataToRelative(response.data)', this.convertDataToRelative(response.data));
                this.setState({
                    AV3000731: this.convertDataToRelative(response.data),
                    minDate: Math.max(response.data[0].x, now - day, this.state.minDate),
                });
            });
    }


    getTrendData(title, startTime, endTime) {
        return axios.post('/trend', {
            title: title,
            startTime: startTime,
            endTime: endTime,
        });
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
        this.getTrendData('AV3000730', startFrom, now)
            .then((response) => {
                this.setState({
                    AV3000730: this.convertDataToRelative(response.data),
                    minDate: startFrom,
                });
            });
        this.getTrendData('AV3000731', startFrom, now)
            .then((response) => {
                this.setState({
                    AV3000731: this.convertDataToRelative(response.data),
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
                    <VerticalBarSeries   data={this.state.AV3000730} color={'orange'} />
                    <VerticalBarSeries   data={this.state.AV3000731} color={'blue'} />
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

export default ConsumptionChart;
