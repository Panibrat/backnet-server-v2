const getBufferFromTable = (table) => {
    return table.reduce((sum, point) => {
        sum[point.name] = {
            name: point.name,
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
