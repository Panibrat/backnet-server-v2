const getBufferFromTable = (table) => {
    return table.reduce((sum, point) => {
        sum[point.title] = {
            title: point.title,
            address: point.address,
            type: point.type,
            description: point.description,
            units: point.units,
            value: point.value,
            trend: point.trend
        };
        return sum;
    }, {});
};

module.exports = { getBufferFromTable };
