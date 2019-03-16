import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { setTitle } from '../../../actions/menuActions';
import { PlotChart } from '../PlotChart/PlotChart';
import ChartItemButton from '../components/ChartItemButton';
import styles from './ChartPage.css';

const now = new Date().getTime();
const minute = 1000 * 60;
const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointsToView: ['AI3000156', 'AI3000177', 'AI3000172', 'AI3000157'],
            chartData: [],
            startTime: now - day,
            endTime: now,
            minValue: null,
            maxValue: null,
            startTimeShift: 24,
        };
        this.handleUpdateStartTime = this.handleUpdateStartTime.bind(this);
        this.handleTogglePointVisibility = this.handleTogglePointVisibility.bind(this);
    }

    promiseAll() {
        const { startTime, endTime, pointsToView} = this.state;
        Promise.all(pointsToView.map(item => this.getTrendData(item, startTime, endTime)))
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
        this.setState({ startTime, chartData, startTimeShift: hoursOffset}, this.promiseAll);
    }

    handleTogglePointVisibility(title) {
        const { pointsToView } = this.state;
        if (pointsToView.indexOf(title) === -1) {
            const newPoints = [...pointsToView, title];
            this.setState({ pointsToView: newPoints });
        } else {
            const newPoints = pointsToView.filter((items) => items !== title);
            this.setState({ pointsToView: newPoints });
        }
    }

    handleRefresh() {
        this.setState({ chartData: [] }, this.promiseAll);
    }

    render() {
        const { chartData, startTime, endTime, minValue, maxValue, pointsToView, startTimeShift } = this.state;
        return (
            <div>
                <PlotChart
                    chartData={chartData}
                    startTime={startTime}
                    endTime={endTime}
                    minValue={minValue}
                    maxValue={maxValue}
                />
                <div className={styles.timeSetButtonsGroup}>
                    <Button
                        className={styles.timeSetButton}
                        variant={startTimeShift === 1 ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleUpdateStartTime(1) }>
                        - 1h
                    </Button>
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
                </div>
                <ChartItemButton
                    color="blue"
                    title="AI3000156"
                    name="Т OUT"
                    description="Температура наружного воздуха"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <ChartItemButton
                    color="green"
                    title="AI3001122"
                    name="iT_FOR"
                    description="T Supply temperature"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <ChartItemButton
                    color="red"
                    title="AI3000157"
                    name="iT_SUP"
                    description="Температура подачи котлов"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <ChartItemButton
                    color="orange"
                    title="AI3000158"
                    name="iT_RET"
                    description="Температура обратки котлов"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <ChartItemButton
                    color="#f76537"
                    title="AI3000177"
                    name="iT_HF_KITCH"
                    description="Температура теплого пола в кухне"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <ChartItemButton
                    color="#a5e0ac"
                    title="AI3000160"
                    name="iT_KITCHEN"
                    description="Температура в кухне"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <ChartItemButton
                    color="#819043"
                    title="AI3000172"
                    name="iT_ZAL"
                    description="Температура в зале (право)"
                    callBack={(title) => this.handleTogglePointVisibility(title)}
                    points={pointsToView}
                />
                <Button className={styles.refreshButton} variant="contained" color="primary" onClick={() => this.handleRefresh() }>REFRESH</Button>
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
