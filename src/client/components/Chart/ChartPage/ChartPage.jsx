import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { setTitle } from '../../../actions/menuActions';
import { toggleTrendPointVisibilityAction } from '../../../actions/trendsSetActions';
import { PlotChart } from '../PlotChart/PlotChart';
import ChartItemButton from '../components/ChartItemButton';
import styles from './ChartPage.css';
import configAI from '../../../../../backnet/configAI_data.json';

const now = new Date().getTime();
const minute = 1000 * 60;
const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            startTime: now - day,
            endTime: now,
            minValue: null,
            maxValue: null,
            startTimeShift: 24,
        };
        this.handleUpdateStartTime = this.handleUpdateStartTime.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Тренды');
        this.promiseAll();
    }

    getTrendData(title, startTime, endTime) {
        const token = this.props.user ? this.props.user.token : 'fakeToken';
        return axios.post('/trend',
            {
                title,
                startTime,
                endTime,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth': token,
                },
            });
    }

    promiseAll() {
        const { startTime, endTime } = this.state;
        const { pointsToView } = this.props;
        Promise.all(pointsToView.map(item => this.getTrendData(item, startTime, endTime)))
            .then((results) => {
                const arrayData = results.map(resp => resp.data);
                this.calcMinAndMaxValue(arrayData);
                return arrayData;
            })
            .then(arrayData => {
                this.setState((state) => {
                    return { chartData: [...state.chartData, ...arrayData] };
                });
            });
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
            };
        });
    }

    handleUpdateStartTime(hoursOffset) {
        const startTime = now - (hoursOffset * hour);
        const chartData = [];
        this.setState({ startTime, chartData, startTimeShift: hoursOffset}, this.promiseAll);
    }

    handleRefresh() {
        this.setState({ chartData: [] }, this.promiseAll);
    }

    render() {
        const {
            chartData, startTime, endTime, minValue, maxValue, startTimeShift,
        } = this.state;
        const { pointsToView, toggleTrendPointVisibility } = this.props;
        const filteredData = configAI.filter((item) => item.trend);

        return (
            <div>
                <PlotChart
                    chartData={ chartData }
                    startTime={ startTime }
                    endTime={ endTime }
                    minValue={ minValue }
                    maxValue={ maxValue }
                />
                <div className={ styles.timeSetButtonsGroup }>
                    <Button
                        className={ styles.timeSetButton }
                        variant={ startTimeShift === 1 ? 'contained' : 'outlined' }
                        color="primary"
                        onClick={ () => this.handleUpdateStartTime(1) }>
                        - 1h
                    </Button>
                    <Button
                        className={ styles.timeSetButton }
                        variant={ startTimeShift === 4 ? 'contained' : 'outlined' }
                        color="primary"
                        onClick={ () => this.handleUpdateStartTime(4) }>
                        - 4h
                    </Button>
                    <Button
                        className={ styles.timeSetButton }
                        variant={ startTimeShift === 12 ? 'contained' : 'outlined' }
                        color="primary"
                        onClick={ () => this.handleUpdateStartTime(12) }>
                        - 12h
                    </Button>
                    <Button
                        className={ styles.timeSetButton }
                        variant={ startTimeShift === 24 ? 'contained' : 'outlined' }
                        color="primary"
                        onClick={ () => this.handleUpdateStartTime(24) }>
                        - 24h
                    </Button>
                </div>
                {
                    filteredData.map(({ title, name, description, colorTrend }) => {
                        return (
                            <ChartItemButton
                                key={title}
                                color={colorTrend || 'grey'}
                                title={title}
                                name={name}
                                description={description}
                                callBack={(title) => toggleTrendPointVisibility(title)}
                                points={pointsToView}
                            />
                        )
                    })
                }
                <Button
                    className={styles.refreshButton}
                    variant="contained"
                    color="primary"
                    onClick={() => this.handleRefresh() }
                >
                    REFRESH
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        pointsToView: state.trends,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            setTitle,
            toggleTrendPointVisibility: toggleTrendPointVisibilityAction,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
