const getAOPointArrayFromJSON = (jsonData) => {
    const arrayOfTitles = jsonData.filter((item) => item.title);
    return arrayOfTitles.map((item) => {
        if (item.title.slice(0, 2) === 'AO') {
            return Number(item.title.slice(2));
        }
    });
};

module.exports = getAOPointArrayFromJSON;
