import React, { Component } from 'react';

import {timeFormatDefaultLocale} from 'd3-time-format';
import './ChartPage.css';
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
    render() {
        const data = [
            { x: now - 24 * hour, y: 8},
            { x: now - 22 * hour, y: 5},
            { x: now - 20 * hour, y: 4},
            { x: now - 18 * hour, y: 9},
            { x: now - 16 * hour, y: 1},
            { x: now - 14 * hour, y: 7},
            { x: now - 12 * hour, y: 6},
            { x: now - 10 * hour, y: 3},
            { x: now - 8 * hour, y: 2},
            { x: now - 6 * hour, y: 0},
            { x: now - 4 * hour, y: 5},
            { x: now - 2 * hour, y: 1},
            { x: now, y: 2},
        ];
        const data2 = [
            { x: now - 24 * hour, y: 9},
            { x: now - 22 * hour, y: 2},
            { x: now - 20 * hour, y: 4},
            { x: now - 18 * hour, y: 2},
            { x: now - 16 * hour, y: 9},
            { x: now - 14 * hour, y: 7},
            { x: now - 12 * hour, y: 8},
            { x: now - 10 * hour, y: 9},
            { x: now - 8 * hour, y: 7},
            { x: now - 6 * hour, y: 5},
            { x: now - 4 * hour, y: 4},
            { x: now - 2 * hour, y: 7},
            { x: now, y: 1},
        ];
        return (
            <XYPlot width={360} height={300} xDomain={[now - day, now]} xType={'time'}>
                <XAxis title="time" />
                <YAxis title={"kW"} />
                <HorizontalGridLines />
                <VerticalGridLines />
                {/*<VerticalBarSeries  data={data} />*/}
                <LineMarkSeries   data={data} color={'blue'} />
                <LineMarkSeries   data={data2} color={'green'}/>
            </XYPlot>
        );
    }
}

export default ChartPage;
