const getBOPointArrayFromJSON = (jsonData) => {
    const arrayOfTitles = jsonData.filter((item) => item.title);
    return arrayOfTitles.map((item) => {
        if (item.title.slice(0, 2) === 'BO') {
            return Number(item.title.slice(2));
        }
    });
};

module.exports = getBOPointArrayFromJSON;
