const getPointsArrayFromJSON = (jsonData, pointType) => {
    return jsonData.map((item) => {
        if (item.title.slice(0, 2) === pointType) {
            return Number(item.title.slice(2));
        }
        return null;
    //}).filter(item => item);
    });
};

module.exports = getPointsArrayFromJSON;
