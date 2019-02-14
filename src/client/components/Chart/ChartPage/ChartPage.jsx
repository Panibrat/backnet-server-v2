import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { PlotChart } from '../PlotChart/PlotChart';
import './ChartPage.css';

const now = new Date().getTime();
const minute = 1000 * 60;
const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initPoints: ['AI3001121', 'AI3001122'],
            chartData: [],
            startTime: now - day,
            endTime: now,
            minValue: null,
            maxValue: null,
        };
    }

    getAllData() {
        this.state.initPoints.forEach((point) => {
            this.getTrendData(point, now - day, now)
                .then((response) => {
                    this.setState((state) => {
                        return {chartData: [...state.chartData, response.data]}
                    })
                });
        })
    }

    promiseAll() {
        const { startTime, endTime, initPoints} = this.state;
        Promise.all(initPoints.map(item => this.getTrendData(item, startTime, endTime)))
            .then((results) => {
            const arrayData = results.map(resp => resp.data);
            this.calcMinAndMaxValue(arrayData);
            return arrayData
            })
            .then(arrayData => {
                this.setState((state) => {
                    return {chartData: [...state.chartData, ...arrayData]}
                })
        })
    }

    componentDidMount() {
        this.promiseAll();
    }

    getTrendData(title, startTime, endTime) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/trend', {
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

    calcMinAndMaxValue(allData) {
        if (allData.length === 0) {
            return;
        }
        const arrayOfValues = allData.reduce((sum, item) => {
            return [...sum, ...item.chart.map(chart => chart.value)];
        }, []);

        const minValue = Math.min.apply(null, arrayOfValues);
        const maxValue = Math.max.apply(null, arrayOfValues);

        this.setState(() => {
            return {
                minValue,
                maxValue,
            }
        })
    }

    render() {
        const { chartData, startTime, endTime, minValue, maxValue } = this.state;
        return (
            <div>
                <PlotChart
                    chartData={chartData}
                    startTime={startTime}
                    endTime={endTime}
                    minValue={minValue}
                    maxValue={maxValue}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(ChartPage);
