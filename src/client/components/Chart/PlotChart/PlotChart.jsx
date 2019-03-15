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
    baseAnimationDuration = 500;
    baseAnimationDelay = 200;

    renderSegment(svg, chart) {
        const { startTime, endTime, minValue, maxValue } = this.props;
        const oneHourAgo = new Date().getTime() - 3600000;

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

        trendLine.attr('class', `${styles.plotLine} ${chart.title}`)
            .append('path')
            .attr('opacity', 0)
            .style('stroke', colorWheel[chart.title] || 'grey')
            .attr('d', line(chart.chart))
            .on('click', function (d) {
                const mouse = d3.mouse(this);
                console.log('mouse', mouse);
                console.log('description', chart.description);
                console.log('value', yCalcInverse(mouse[1]));
                const time = new Date(xCalcInverse(mouse[0]));
                console.log('time', time);
            })
            .transition()
            .duration(this.baseAnimationDuration * 2)
            .delay(this.baseAnimationDelay)
            .attr('opacity', 1);

/*        svg.append('g').append('circle')
                .attr('cx', () => xCalc(oneHourAgo))
                .attr('cy', () => yCalc(10))
                .attr('r', 5)
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .attr('fill', 'red')*/
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
