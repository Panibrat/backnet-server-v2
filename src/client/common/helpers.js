import * as d3 from 'd3';

export const convertDiffTemperaturesToColor = (temperature, setPoint) => {
    const t = (temperature - setPoint + 5 ) / 10;
    return d3.interpolateRgbBasis(['blue', 'lightblue', 'green', 'yellow', 'red'])(t);
};

export const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return { value: 99 };
    }
    return pointsList[index];
};

export const findValueOfPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index].value;
};

export const valueToFixed = (value) => {
    if (value === 100) {
        return value;
    }
    if (value === 0) {
        return '0.0';
    }
    return value ? value.toFixed(1) : value;
};
