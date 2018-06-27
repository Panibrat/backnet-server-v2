const getStateFromBuffer = (bufferData, configAV, configBV) => {
    const AVs = configAV;
    const BVs = configBV;

    BVs.forEach((point) => {
        const index = bufferData.findIndex(updatedPoint => updatedPoint.title === point.title);
        if (index !== -1) {
            point.value = bufferData[index].value;
        }
    });
    AVs.forEach((point) => {
        const index = bufferData.findIndex(updatedPoint => updatedPoint.title === point.title);
        if (index !== -1) {
            point.value = bufferData[index].value;
        }
    });
    return [...AVs, ...BVs];
};

module.exports = getStateFromBuffer;
