const getStateFromBuffer = (bufferData, configAV, configBV, configAI, configAO, configBI, configBO) => {
    const AVs = configAV;
    const BVs = configBV;
    const AIs = configAI;
    const AOs = configAO;
    const BIs = configBI;
    const BOs = configBO;

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
    AIs.forEach((point) => {
        const index = bufferData.findIndex(updatedPoint => updatedPoint.title === point.title);
        if (index !== -1) {
            point.value = bufferData[index].value;
        }
    });
    AOs.forEach((point) => {
        const index = bufferData.findIndex(updatedPoint => updatedPoint.title === point.title);
        if (index !== -1) {
            point.value = bufferData[index].value;
        }
    });
    BIs.forEach((point) => {
        const index = bufferData.findIndex(updatedPoint => updatedPoint.title === point.title);
        if (index !== -1) {
            point.value = bufferData[index].value;
        }
    });
    BOs.forEach((point) => {
        const index = bufferData.findIndex(updatedPoint => updatedPoint.title === point.title);
        if (index !== -1) {
            point.value = bufferData[index].value;
        }
    });
    return [...AVs, ...BVs, ...AIs, ...AOs, ...BIs, ...BOs];
};

module.exports = getStateFromBuffer;
