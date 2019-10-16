export const addTwoTarifs = (dayData, nightData) => {
    const totalData = [];
    if(!dayData || !nightData || dayData.length === 0 || nightData.length === 0) {
        return [];
    }
    dayData.forEach((day) => {
        const index = nightData.findIndex((night) => night.identity === day.identity);
        if (index !== -1) {
            totalData.push({
                identity: day.identity,
                y: day.diff + nightData[index].diff,
                x: day.timeStamp,
            });
        }
    });
    return totalData.sort((a, b) => a.x - b.x);
};

export const getMinTimeStampFromArray = (arr) => {
    const arrayOfTimeStamps = arr.map((item) => {
        return item.timeStamp;
    });
    return Math.min.apply(null, arrayOfTimeStamps);
};

export const convertDataForBarChart = (data) => {
    return data.map(item => {
        return {
            x: item.timeStamp,
            y: item.diff,
            identity: item.identity,
            title: item.title,
        }
    }).sort((a, b) => a.x - b.x);
};

export const convertDataForPlotChart = (data) => {
    return data.map(item => {
        return {
            timeStamp: item.timeStamp,
            value: item.diff,
            identity: item.identity,
        }
    }).sort((a, b) => a.timeStamp - b.timeStamp);
};

export const convertTotalDataForPlotChart = (data) => {
    return data.map(item => {
        return {
            timeStamp: item.x,
            value: item.y,
            identity: item.identity,
        }
    }).sort((a, b) => a.timeStamp - b.timeStamp);
};

export const convertDataToRelative = (dataArray) => {
    return dataArray.reduce((previousValue, currentItem, index, arr) => {
        if (index > 0) {
            const relativeValue = arr[index].y - arr[index - 1].y;
            previousValue.push({ x: currentItem.x, y: relativeValue });
            return previousValue;
        }
        return previousValue;
    }, []);
};

export const getDataForPlotChartConsumption = (day, night, total) => {
    return [
        {
            title: 'Day',
            chart: convertDataForPlotChart(day),
            name: 'Day consumption',
            description: 'Day consumption description',
            colorTrend: '#ff9800',
        },
        {
            title: 'Night',
            chart: convertDataForPlotChart(night),
            name: 'Night consumption',
            description: 'Night consumption description',
            colorTrend: '#3f51b5',
        },
        {
            title: 'Total',
            chart: convertTotalDataForPlotChart(total),
            name: 'Total consumption',
            description: 'Total consumption description',
            colorTrend: '#bdbdbd',
        },
    ]
};
