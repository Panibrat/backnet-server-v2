import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { timeFormatDefaultLocale } from 'd3-time-format';
import './ChartPage.css';
import DateAndTimePickers from '../../DateAndTimePicker/DateAndTimePicker';
import {
    XYPlot,
    VerticalBarSeries,
    LineSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis,
    LineMarkSeries,
} from 'react-vis';

timeFormatDefaultLocale({
    dateTime: "%A, %e %B %Y г. %X",
    date: "%d.%m.%Y",
    time: "%H:%M:%S",
    periods: [
        "AM",
        "PM"
    ],
    days: [
        "воскресенье",
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота"
    ],
    shortDays: [
        "вс",
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб"
    ],
    months: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ],
    shortMonths: [
        "янв",
        "фев",
        "мар",
        "апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек"
    ]
});

//const now = new Date("2016-07-25T14:39:34.527Z").getTime();
const now = new Date().getTime();
const minute = 1000 * 60;
const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;

class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AI3001122: [],
            AI3001121: [],
            minDate: 0
        };
    }

    componentDidMount() {
        this.getTrendData('AI3001122', now - day, now)
            .then((response) => {
                console.log('response.data', response.data);
                this.setState({
                    AI3001122: response.data,
                    minDate: Math.max(response.data[0].x, now - day, this.state.minDate),
                });
            });

        this.getTrendData('AI3001121', now - day, now)
            .then((response) => {
                this.setState({
                    AI3001121: response.data,
                    minDate: Math.max(response.data[0].x, now - day, this.state.minDate),
                });
            });
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
        return (
            <div>
                <XYPlot width={360} height={300} xDomain={[this.state.minDate, now]} xType={'time'}>
                    <HorizontalGridLines />
                    <VerticalGridLines />
                    {/*<VerticalBarSeries  data={data} />*/}
                    <LineMarkSeries   data={this.state.AI3001121} color={'blue'} />
                    <LineMarkSeries   data={this.state.AI3001122} color={'green'} />
                    <XAxis title="time" />
                    <YAxis title={"℃"} />
                </XYPlot>
                <DateAndTimePickers/>
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
