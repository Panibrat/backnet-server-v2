class DataBuffer {
    constructor() {
        this.data = [];
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

    setData(point) {
        const index = this.data.findIndex(stored => stored.title === point.title);
        if (index === -1) {
            this.data = [...this.data, {
                title: point.title,
                value: point.value,
            }];
            this.onDataChange(point);
            // console.log(`Write ${point.title} -> ${point.value}`);
        } else if (Math.abs(this.data[index].value - point.value) > 0.25) {
            this.data[index].value = point.value;
            this.onDataChange(point);
            // console.log(`Update ${point.title} -> ${point.value}`);
        } else {
            console.log(`Same value ${point.title} -> ${point.value}`);
        }
    }
}

module.exports = new DataBuffer();
