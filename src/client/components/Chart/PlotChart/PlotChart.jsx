import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as d3 from 'd3';

import styles from './PlotChart.css';

export class PlotChart extends Component {
    svg;
    width = 450;
    height = 600;
    margin = { top: 50, right: 10, bottom: 40, left: 40 };
    chartHeight = this.height - (this.margin.top + this.margin.bottom);
    chartWidth = this.width - (this.margin.left + this.margin.right);
    baseAnimationDuration = 500;
    baseAnimationDelay = 200;
    oneHourAgo = new Date().getTime() - 3600000;
    timeOut = { timerId: null };

    renderSegment(svg, chart) {
        const { startTime, endTime, minValue, maxValue } = this.props;
        const formatToDecimal = d3.format('.1f');
        const formatDateToTime = d3.timeFormat(' %H:%M');
        const yCalc = d3.scaleLinear()
            .domain([minValue - 2, maxValue + 2])
            .range([this.chartHeight, 0])
            .nice();

        const yCalcInverse = d3.scaleLinear()
            .domain([this.chartHeight, 0])
            .range([minValue - 2, maxValue + 2]);

        const xCalc = d3.scaleTime()
            .domain([startTime, endTime])
            .range([0, this.chartWidth]);

        const xCalcInverse = d3.scaleTime()
            .domain([0, this.chartWidth])
            .range([startTime, endTime]);

        const line = d3.line()
            .x(d => xCalc(d.timeStamp))
            .y(d => yCalc(d.value))
          //  .curve(d3.curveBundle.beta(1));
            .curve(d3.curveMonotoneX);

        svg.selectAll('.' + chart.title)
            .remove();

        const trendLine = svg.append('g');

        const renderTile = this.renderTile;
        const clearTile = this.clearTile;
        const timeOut = this.timeOut;

        trendLine.attr('class', `${styles.plotLine} ${chart.title}`)
            .append('path')
            .attr('opacity', 0)
            .style('stroke', chart.colorTrend || 'grey')
            .attr('d', line(chart.chart))
            .on('click', function () {
                const mouse = d3.mouse(this);
                const x = mouse[0];
                const y = mouse[1];
                const value = formatToDecimal(yCalcInverse(mouse[1]));
                const name = chart.name;
                const date = new Date(xCalcInverse(mouse[0]));
                const time = formatDateToTime(date);
                renderTile(svg, x, y, value, name, time, timeOut.timerId);
                timeOut.timerId = setTimeout(() => clearTile(svg), 2000);
            })
            .transition()
            .duration(this.baseAnimationDuration * 2)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);

/*        svg.append('g').append('circle')
                .attr('cx', () => xCalc(this.oneHourAgo))
                .attr('cy', () => yCalc(10))
                .attr('r', 5)
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .attr('fill', 'red')
                */
    }

    clearTile(svg) {
        svg.selectAll('.infoTile')
            .remove();
    }

    renderTile(svg, calcX, calcY, value, name, time, timerId) {
        if (timerId) {
            clearTimeout(timerId);
        }

        const x = calcX - 52;
        const y = calcY - 58;

        svg.selectAll('.infoTile')
            .remove();

        const tile = svg.append('g')
            .attr('class', 'infoTile');
            // .attr('filter', 'url(#dropshadow)');

        tile.append('path')
            .attr('opacity', '1')
            .attr('fill', '#1769aa')
            .style('stroke', 'white')
            .attr('d', 'M13.768 0h79a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H57.224l-4.57 5.937L48.151 52H13.768a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z')
            .attr('transform', `translate(${x}, ${y})`);

        tile.append('text')
            .text(`${ value }℃`)
            .attr('class', styles.tileValue)
            .attr('text-anchor', 'middle')
            .attr('opacity', 1)
            .attr('x', `${ x + 53 }`)
            .attr('y', `${ y + 16 }`);

        tile.append('text')
            .text(name)
            .attr('class', styles.tileName)
            .attr('text-anchor', 'middle')
            .attr('opacity', 1)
            .attr('x', `${ x + 53 }`)
            .attr('y', `${ y + 32 }`);

        tile.append('text')
            .text(time)
            .attr('class', styles.tileName)
            .attr('text-anchor', 'middle')
            .attr('opacity', 1)
            .attr('x', `${ x + 53 }`)
            .attr('y', `${ y + 48 }`);
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
        const { minValue, maxValue} = this.props;
        const yCalc = d3.scaleLinear()
            .domain([minValue - 2, maxValue + 2])
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
        const { minValue, maxValue } = this.props;
        const yCalc = d3.scaleLinear()
            .domain([minValue - 2, maxValue + 2])
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

    renderAllData(svg, allData) {
        svg.selectAll(`.${styles.plotLine}`)
            .remove();
        allData.forEach((chart) => {
            this.renderSegment(svg, chart);
        })
    }

    componentDidMount() {
        const { chartData, minValue, maxValue } = this.props;
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

        if (chartData.length && chartData.length > 0 && minValue && maxValue) {
            this.renderXaxis(this.svg);
            this.renderXLines(this.svg);
            this.renderYLines(this.svg);
            this.renderYaxis(this.svg);
            this.renderAllData(this.svg, chartData);
        } //TODO: else render spinner
    }

    componentDidUpdate() {
        const { chartData } = this.props;
        this.renderXaxis(this.svg);
        this.renderXLines(this.svg);
        this.renderYaxis(this.svg);
        this.renderYLines(this.svg);
        this.renderAllData(this.svg, chartData);
    }

    shouldComponentUpdate(nextProps) {
        const { chartData } = this.props;
        if ( nextProps.chartData.length === 0 ) {
            return false;
        }
        const isNeedUpdate = (chartData.length !== nextProps.chartData.length)
            || (this.props.minValue !== nextProps.minValue)
      /*      || (this.props.startTime !== nextProps.startTime)
            || (this.props.endTime !== nextProps.endTime)*/
            || (this.props.maxValue !== nextProps.maxValue);
        return isNeedUpdate;
    }

    render() {
        return (
            <div className={'containerTMP'} />
        );
    }
}
