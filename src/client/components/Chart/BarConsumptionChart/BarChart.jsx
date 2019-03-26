import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';

import styles from './BarChart.css';

import EnergyDayTotal from './mocks/EnergyDayTotal.json';

const colorWeel = {
    EnergyDayTotal: '#ff9800',
    EnergyNightTotal: '#3f51b5',
};

export class BarChart extends Component {
    svg;
    width = 450;
    height = 600;
    barHeight;
    margin = { top: 50, right: 20, bottom: 40, left: 40 };
    chartHeight = this.height - (this.margin.top + this.margin.bottom);
    chartWidth = this.width - (this.margin.left + this.margin.right);
    baseAnimationDuration = 500;
    baseAnimationDelay = 200;
    oneHourAgo = new Date().getTime() - 3600000;
    plotWidth = 8;
    maxValue;
    xCalc;
    yCalc;
    day = 1000 * 60 * 60 * 24;

    renderSegment(chart, id) {

        this.svg.selectAll(`.${id}`)
            .remove();

        const segment = this.svg.append('g');

        segment.attr('class', `${id}`)
            .selectAll('rect')
            .data(chart)
            .enter().append('rect')
            .attr('height', 0)
            .attr('y', this.yCalc(0))
            .attr('width', this.plotWidth)
            .attr('fill', colorWeel[id] || 'grey')
            .attr('x', (d) => this.xCalc(d.x) - this.plotWidth / 2)
            .attr('rx', 8)
            .attr('ry', 4)
            .attr('class', `${styles.bar} barChartSegment`)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('y', d => this.yCalc(d.y / 1000))
            .attr('height', d => this.yCalc(0) - this.yCalc(d.y / 1000));
    }


    renderXaxis() {
        const { startTime, endTime } = this.props;

        const xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        const xAxis = d3.axisBottom(xCalc)
            .ticks(7)
            .tickFormat(d3.timeFormat((endTime - startTime) < 6 * this.day ? ' %H %M' : '%a'))
            .tickPadding(10)
            .tickSize(-this.chartHeight);

        this.svg.selectAll('.xAxis')
            .remove();

        this.svg.append('g')
            .attr('class', `${styles.xAxis} xAxis`)
            .attr('transform', `translate(0, ${this.chartHeight})`)
            .attr('opacity', 0.2)
            .call(xAxis)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);
    }

    renderYaxis() {
        const yAxis = d3.axisLeft(this.yCalc)
            .ticks(7)
            .tickPadding(5)
            .tickFormat(d => (d + 'kW'))
            .tickSize(-this.width);

        this.svg.selectAll('.yAxis')
            .remove();

        this.svg.append('g')
            .attr('class', `${styles.yAxis} yAxis`)
            .call(yAxis)
            .attr('opacity', 0.2)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);
    }

    renderAllData(allData) {
        this.svg.selectAll(`.${styles.plotLine}`)
            .remove();
        allData.forEach((chart) => {
            this.renderSegment(chart);
        })
    }

    componentDidMount() {
        const { EnergyDayTotal, EnergyNightTotal, startTime, endTime } = this.props;
        const element = ReactDOM.findDOMNode(this);
        // this.height = height || (element).parentElement.clientHeight;
        this.barHeight = this.height - (this.margin.top + this.margin.bottom);

        const arrayOfValues = [...EnergyDayTotal, ...EnergyNightTotal].map(item => item.y);
        this.plotWidth = Math.min (Math.max(this.chartWidth / (arrayOfValues.length), 2), 8);
        this.maxValue = Math.max.apply(null, arrayOfValues);

        this.yCalc = d3.scaleLinear()
            .domain([0, this.maxValue])
            .range([this.barHeight, 0]);

        this.xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        this.svg = d3.select(element)
            .append('svg')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('preserveAspectRatio', 'xMinYMax meet')
            .style('min-width', '300px')
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        if (EnergyDayTotal && EnergyNightTotal && EnergyDayTotal.length > 0 && EnergyNightTotal.length > 0 ) {
            this.renderXaxis();
            this.renderYaxis();
            this.renderSegment(EnergyDayTotal, 'EnergyDayTotal');
            this.renderSegment(EnergyNightTotal, 'EnergyNightTotal');
        } //TODO: else render spinner
    }

    componentDidUpdate() {
        const { EnergyDayTotal, EnergyNightTotal, startTime, endTime } = this.props;
        const arrayOfValues = [...EnergyDayTotal, ...EnergyNightTotal].map(item => item.y / 1000);
        this.plotWidth = Math.min (Math.max(this.chartWidth / (arrayOfValues.length), 2), 8);
        this.maxValue = Math.max.apply(null, arrayOfValues);

        this.yCalc = d3.scaleLinear()
            .domain([this.maxValue, 0])
            .range([0, this.barHeight]);

        this.xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        this.renderXaxis();
        this.renderYaxis();
        this.renderSegment(EnergyDayTotal, 'EnergyDayTotal');
        this.renderSegment(EnergyNightTotal, 'EnergyNightTotal');
    }

    shouldComponentUpdate(nextProps) {
        const { EnergyDayTotal, EnergyNightTotal } = this.props;
        if ( nextProps.EnergyDayTotal.length === 0 && nextProps.EnergyNightTotal.length === 0)  {
            return false;
        }
        const isNeedUpdate = (EnergyDayTotal.length !== nextProps.EnergyDayTotal.length)
            || (EnergyNightTotal.length !== nextProps.EnergyNightTotal.length)
            || (this.props.startTime !== nextProps.startTime)
            || (this.props.endTime !== nextProps.endTime);
        return isNeedUpdate;
    }

    render() {
        return (
            <div className={'container'} />
        );
    }
}
