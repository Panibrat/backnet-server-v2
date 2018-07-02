class DataBuffer {
    constructor() {
        this.data = {};
        this.dataListeners = [];
    }

    getData() {
        return this.data;
    }

    setDataListeners(listener) {
        this.dataListeners.push(listener);
    }

    onDataChange(dataPoint) {
        this.dataListeners.forEach((listener) => { listener.updateData(dataPoint); });
    }

    readDataFromConfig(points) {
        points.forEach((point) => {
            this.data[point.title] = point;
        });
    }

    setData(point) {
        if (!this.data[point.title]) {
            this.data[point.title] = point;
            this.onDataChange(point);
        } else if (Math.abs(this.data[point.title].value - point.value) > 0.01) {
            this.data[point.title].value = point.value;
            this.onDataChange(point);
        } else {
            console.log(`Same value ${point.title} -> ${point.value}`);
        }
    }
}

module.exports = new DataBuffer();
