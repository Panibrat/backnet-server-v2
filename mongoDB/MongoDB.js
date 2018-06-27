class MongoDB {
    constructor() {
        this.data = [];
        this.dataListeners = [];
    }

    updateData(dataPoint) {
        console.log('Mongo write: ', dataPoint);
    }
}

module.exports = new MongoDB();
