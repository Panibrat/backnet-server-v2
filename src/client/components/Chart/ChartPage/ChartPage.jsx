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
    componentDidMount() {
        this.getAllData();
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

    render() {
        const { chartData, startTime, endTime } = this.state;
        return (
            <div>
                <PlotChart
                    chartData={chartData}
                    startTime={startTime}
                    endTime={endTime}
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
