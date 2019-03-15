import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import axios from 'axios';

import { setTitle } from '../../../actions/menuActions';
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
            initPoints: ['AI3000156', 'AI3001122', 'AI3000177', 'AI3000160', 'AI3000172', 'AI3000157', 'AI3000158'],
            chartData: [],
            startTime: now - day,
            endTime: now,
            minValue: null,
            maxValue: null,
        };
        this.handleUpdateStartTime = this.handleUpdateStartTime.bind(this);
        this.handleTogglePointVisibility = this.handleTogglePointVisibility.bind(this);
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
        this.props.setTitle('Тренды');
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

    handleUpdateStartTime(hoursOffset) {
        const startTime = now - (hoursOffset * hour);
        const chartData = [];
        this.setState({ startTime, chartData }, this.promiseAll);
    }

    handleTogglePointVisibility(title) {
        const { initPoints } = this.state;
        if (initPoints.indexOf(title) === -1) {
            const newPoints = [...initPoints, title];
            this.setState({ initPoints: newPoints, chartData: [] }, this.promiseAll);
        } else {
            const newPoints = initPoints.filter((items) => items !== title);
            this.setState({ initPoints: newPoints, chartData: [] }, this.promiseAll);
        }
    }

    handleRefresh() {
        this.setState({ chartData: [] }, this.promiseAll);
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
                <button onClick={() => this.handleUpdateStartTime(1) }> - 1h</button>
                <button onClick={() => this.handleUpdateStartTime(4) }> - 4h</button>
                <button onClick={() => this.handleUpdateStartTime(12) }> - 12h</button>
                <button onClick={() => this.handleUpdateStartTime(24) }> - 24h</button>
                <hr/>
                <button onClick={() => this.handleTogglePointVisibility('AI3000156') }>Т OUT</button>
                <button onClick={() => this.handleTogglePointVisibility('AI3001122') }>iT_FOR </button>
                <button onClick={() => this.handleTogglePointVisibility('AI3000177') }>iT_HF_KITCH</button>
                <button onClick={() => this.handleTogglePointVisibility('AI3000160') }>iT_KITCHEN</button>
                <button onClick={() => this.handleTogglePointVisibility('AI3000172') }>iT_ZAL</button>
                <button onClick={() => this.handleTogglePointVisibility('AI3000157') }>iT_SUP</button>
                <button onClick={() => this.handleTogglePointVisibility('AI3000158') }>iT_RET</button>
                <hr/>
                <button onClick={() => this.handleRefresh() }>REFRESH</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
