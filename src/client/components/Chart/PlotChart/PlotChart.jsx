import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';

import { colorWheel } from './colorWheel';
import styles from './PlotChart.css';

export class PlotChart extends Component {
    svg;
    width = 450;
    height = 600;
    margin = { top: 30, right: 10, bottom: 40, left: 40 };
    chartHeight = this.height - (this.margin.top + this.margin.bottom);
    chartWidth = this.width - (this.margin.left + this.margin.right);
    baseAnimationDuration = 1000;
    baseAnimationDelay = 250;
    minValue;
    maxValue;

    renderSegment(svg, chart) {
        const { startTime, endTime } = this.props;

        const yCalc = d3.scaleLinear()
            .domain([this.minValue - 2, this.maxValue + 2])
            .range([this.height, 0])
            .nice();

        const xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        const line = d3.line()
            .x(d => xCalc(d.timeStamp))
            .y(d => yCalc(d.value))
          //  .curve(d3.curveBundle.beta(1));
            .curve(d3.curveMonotoneX);

        svg.selectAll('.' + chart.title)
            .remove();

        svg.append('g')
            .attr('class', `${styles.plotLine} ${chart.title}`)
            .append('path')
            .attr('opacity', 0)
            .style('stroke', colorWheel[chart.title])
            .attr('d', line(chart.chart))
            .transition()
            .duration(this.baseAnimationDuration * 2)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);

    }

    renderXaxis(svg) {
        const { startTime, endTime } = this.props;

        const xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        const xAxis = d3.axisBottom(xCalc)
            .ticks(7)
            .tickFormat(d3.timeFormat(' %H %M'))
            .tickPadding(10)
            .tickSize(10);

        svg.selectAll('.xAxis')
            .remove();

        svg.append('g')
            .attr('class', `${styles.xAxis} xAxis`)
            .attr('transform', `translate(0, ${this.chartHeight})`)
            .attr('opacity', 0.2)
            .call(xAxis)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);
    }

    renderXLines(svg) {
        const { startTime, endTime } = this.props;

        const xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        const xAxis = d3.axisTop(xCalc)
            .ticks(7)
            .tickPadding(0)
            .tickFormat(d => (''))
            .tickSize(this.chartHeight);

        svg.selectAll('.xAxisLines')
            .remove();

        svg.append('g')
            .attr('class', `${styles.xAxis} xAxisLines`)
            .attr('transform', `translate(0, ${this.chartHeight})`)
            .attr('opacity', 0.2)
            .call(xAxis)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);
    }

    renderYaxis(svg) {
        const yCalc = d3.scaleLinear()
            .domain([this.minValue - 2, this.maxValue + 2])
            .range([this.chartHeight, 0])
            .nice();

        const yAxis = d3.axisLeft(yCalc)
            .ticks(7)
            .tickPadding(5)
            .tickFormat(d => (d + ' ℃'))
            .tickSize(2);

        svg.selectAll('.yAxis')
            .remove();

        svg.append('g')
            .attr('class', `${styles.yAxis} yAxis`)
            .call(yAxis)
            .attr('opacity', 0.2)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);
    }

    renderYLines(svg) {
        const yCalc = d3.scaleLinear()
            .domain([this.minValue - 2, this.maxValue + 2])
            .range([this.chartHeight, 0])
            .nice();

        const yAxis = d3.axisRight(yCalc)
            .ticks(7)
            .tickPadding(0)
            .tickSize(this.width);

        svg.selectAll('.yAxisLines')
            .remove();

        svg.append('g')
            .attr('class', 'yAxisLines')
            .call(yAxis)
            .attr('opacity', 0.2)
            .transition()
            .duration(this.baseAnimationDuration)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 0.5);
    }

    getMaxValueFromArray(arr) {
        return Math.max.apply(null, arr);
    }

    getMinValueFromArray(arr) {
        return Math.min.apply(null, arr);
    }

    calcMinAndMaxValue(allData) {
        if (allData.length === 0) {
            return;
        }
        const arrayOfValues = allData.reduce((sum, item) => {
            return [...sum, ...item.chart.map(chart => chart.value)];
        }, []);

        this.minValue = this.getMinValueFromArray(arrayOfValues);
        this.maxValue = this.getMaxValueFromArray(arrayOfValues);
    }

    renderAllData(svg, allData) {
        allData.forEach((chart) => {
            this.renderSegment(svg, chart);
        })
    }

    componentDidMount() {
        const {chartData} = this.props;
        const element = ReactDOM.findDOMNode(this);
        this.svg = d3.select(element)
            .append('svg')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('preserveAspectRatio', 'xMinYMax meet')
            .style('min-width', '300px')
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.renderXaxis(this.svg);
        this.renderXLines(this.svg);
        this.renderYLines(this.svg);
        this.renderYaxis(this.svg);
        this.calcMinAndMaxValue(chartData);
        this.renderAllData(this.svg, chartData);
    }

    componentDidUpdate() {
        const {chartData} = this.props;

        this.renderXaxis(this.svg);
        this.renderXLines(this.svg);
        this.renderYaxis(this.svg);
        this.renderYLines(this.svg);
        this.calcMinAndMaxValue(chartData);
        this.renderAllData(this.svg, chartData);
    }

    shouldComponentUpdate(nextProps) {
        const isNeedUpdate = this.props.chartData.length !== nextProps.chartData.length;
        return isNeedUpdate;
    }

    render() {
        return (
            <div className={'containerTMP'} />
        );
    }
}