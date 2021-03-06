class DataBuffer {
    constructor() {
        this.data = {};
        this.dataListeners = [];
    }

    getData() {
        return this.data;
    }

    getItem(item) {
        return this.data[item];
    }

    getAnalogInputsData() {
        return this.getDataByType('AI');
    }

    getAnalogOutputsData() {
        return this.getDataByType('AO');
    }

    getBinaryInputsData() {
        return this.getDataByType('BI');
    }

    getBinaryOutputsData() {
        return this.getDataByType('BO');
    }

    getAnalogValueData() {
        return this.getDataByType('AV');
    }

    getBinaryValueData() {
        return this.getDataByType('BV');
    }

    getDataByType(typeOfData) {
        return Object.keys(this.data).map((point) => {
            if (this.data[point].title.slice(0,2) === typeOfData) {
                return this.data[point];
            }
            return null;
        }).filter(item => item);
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
        if (this.data && !this.data[point.title]) {
            this.data[point.title] = point;
            this.onDataChange(point);
        } else if (Math.abs(this.data[point.title].value - point.value) > 0.1) {
           /* console.log('[CHANGED]: ', point.title);
            console.log('[VALUE]: ', point.value);*/
            this.data[point.title].value = point.value;
            this.onDataChange({ ...point, trend: this.data[point.title].trend });
        } else {
            // console.log(`Same value ${point.title} -> ${point.value}`);
        }
    }
}

module.exports = new DataBuffer();
