import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../store/actions/menuActions';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import { BarChart } from '../BarConsumptionChart/BarChart';
import { PlotConsumptionChart } from '../PlotConsumptionChart/PlotConsumptionChart';
import {
    addTwoTarifs,
    convertDataForBarChart,
    convertDataToRelative,
    getDataForPlotChartConsumption,
    getMinTimeStampFromArray } from './common/helpers';

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
            EnergyTotal: [],
            PlotChartConsumptionData: [],
            startTime: 0,
            typeOfChart: 'oneDayConsumptionChart',
        };
    }

    componentDidMount() {
        this.handleGetOneDayConsumption();
    }

    getOneDayConsumptionByTitle(title, startTime, endTime) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/day-consumption', {
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

    handleGetOneDayConsumption() {
        this.props.setTitle('Энергия: за сутки');
        const now = new Date().getTime();
        const startFrom = now - 24 * 3600 * 1000 - hour;
        Promise.all([
            this.getOneDayConsumptionByTitle('EnergyDayTotal', startFrom, now),
            this.getOneDayConsumptionByTitle('EnergyNightTotal', startFrom, now),
        ]).then(result => {
            const EnergyDayTotal = result[0].data;
            const EnergyNightTotal = result[1].data;
            this.setState({
                EnergyDayTotal: convertDataToRelative(EnergyDayTotal),
                EnergyNightTotal: convertDataToRelative(EnergyNightTotal),
                EnergyTotal: [],
                typeOfChart: 'oneDayConsumptionChart',
                startTime: startFrom,
            })
        }).catch(e => {
            console.log('Error: ', e);
        });
    }

    handleGetYearConsumption() {
        this.props.setTitle('Энергия: за год');
        Promise.all([
            this.getYearConsumptionByTitle('EnergyDayTotal'),
            this.getYearConsumptionByTitle('EnergyNightTotal'),
        ]).then(result => {
            const EnergyDayTotal = result[0].data.slice(0, -1);
            const EnergyNightTotal = result[1].data.slice(0, -1);
            const EnergyTotal = addTwoTarifs(EnergyDayTotal, EnergyNightTotal);
            const latestDate = getMinTimeStampFromArray([...EnergyDayTotal, ...EnergyNightTotal]) - 15 * day;
            this.setState({
                EnergyDayTotal: convertDataForBarChart(EnergyDayTotal),
                EnergyNightTotal: convertDataForBarChart(EnergyNightTotal),
                EnergyTotal,
                typeOfChart: 'yearConsumptionChart',
                startTime: latestDate,
            })
        }).catch(e => {
            console.log('Error: ', e);
        });
    }

    getYearConsumptionByTitle(title) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/year-consumption', {
                title: title,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth": token,
                }
            }
        )
    }

    getWeekConsumptionByTitle(title, startTime, endTime) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/week-consumption', {
                title,
                startTime,
                endTime,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth": token,
                }
            }
        )
    }

    handleGetWeekConsumption() {
        this.props.setTitle('Энергия: за неделю');
        const now = new Date().getTime();
        const startFrom = now - 7.5 * day;
        Promise.all([
            this.getWeekConsumptionByTitle('EnergyDayTotal', startFrom, now),
            this.getWeekConsumptionByTitle('EnergyNightTotal', startFrom, now),
        ]).then(result => {
            const EnergyDayTotal = result[0].data.slice(0, 7);
            const EnergyNightTotal = result[1].data.slice(0, 7);
            const EnergyTotal = addTwoTarifs(EnergyDayTotal, EnergyNightTotal);
            this.setState({
                EnergyDayTotal: convertDataForBarChart(EnergyDayTotal),
                EnergyNightTotal: convertDataForBarChart(EnergyNightTotal),
                EnergyTotal: EnergyTotal,
                typeOfChart: 'oneWeekConsumptionChart',
                startTime: startFrom,
            })
        }).catch(e => {
            console.log('Error: ', e);
        });
    }

    getMonthConsumptionByTitle(title, startTime, endTime) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/month-consumption', {
                title,
                startTime,
                endTime,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth": token,
                }
            }
        )
    }

    handleGetMonthConsumption() {
        this.props.setTitle('Энергия: за месяц');
        const now = new Date().getTime();
        const startFrom = now - 32 * day;
        Promise.all([
            this.getMonthConsumptionByTitle('EnergyDayTotal', startFrom, now),
            this.getMonthConsumptionByTitle('EnergyNightTotal', startFrom, now),
        ]).then(result => {
            const EnergyDayTotal = result[0].data.slice(0, -1);
            const EnergyNightTotal = result[1].data.slice(0, -1);
            const EnergyTotal = addTwoTarifs(EnergyDayTotal, EnergyNightTotal);
            const plotChartData = getDataForPlotChartConsumption(EnergyDayTotal, EnergyNightTotal, EnergyTotal);
            this.setState({
                PlotChartConsumptionData: plotChartData,
                typeOfChart: 'oneMonthConsumptionChart',
                startTime: startFrom,
            })
        }).catch(e => {
            console.log('Error: ', e);
        });
    }

    render() {
        const {EnergyDayTotal, EnergyNightTotal, startTime, typeOfChart, EnergyTotal, PlotChartConsumptionData} = this.state;
        const now = new Date().getTime();
        return (
            <div>
                {
                    typeOfChart === 'oneMonthConsumptionChart' ?
                        <PlotConsumptionChart
                            chartData={ PlotChartConsumptionData }
                            startTime={ startTime }
                            endTime={ now }
                        />
                        :
                        <BarChart
                            typeOfChart = {typeOfChart}
                            startTime={startTime}
                            endTime={now}
                            EnergyDayTotal={EnergyDayTotal}
                            EnergyNightTotal={EnergyNightTotal}
                            EnergyTotal={EnergyTotal}
                        />
                }
                <div className={styles.timeSetButtonsGroup}>
                    <Button
                        className={styles.timeSetButton}
                        variant={typeOfChart === 'oneDayConsumptionChart' ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleGetOneDayConsumption() }>
                        One Day
                    </Button>
                    <Button
                        className={styles.timeSetButton}
                        variant={typeOfChart === 'oneWeekConsumptionChart' ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleGetWeekConsumption() }>
                        Week
                    </Button>
                    <Button
                        className={styles.timeSetButton}
                        variant={typeOfChart === 'oneMonthConsumptionChart' ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleGetMonthConsumption() }>
                        Month
                    </Button>
                    <Button
                        className={styles.timeSetButton}
                        variant={typeOfChart === 'yearConsumptionChart' ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => this.handleGetYearConsumption() }>
                        Year
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumptionChart);
