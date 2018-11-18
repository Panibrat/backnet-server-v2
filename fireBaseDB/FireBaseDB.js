class FireBaseDB {
    constructor() {
        this.data = [];
        this.dataListeners = [];
    }

    updateData(dataPoint) {
        console.log('fireBase write: ', dataPoint);
    }
}

module.exports = new FireBaseDB();
