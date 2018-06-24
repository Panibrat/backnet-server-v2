class dataBuffer {
    constructor() {
        this.data = [];
    }
    getData() {
        return this.data;
    }

    setData(point) {
        const index = this.data.findIndex((stored) => {
            return stored.title === point.title
        });
        if(index === -1) {
            this.data = [...this.data, {
                title: point.title,
                value: point.value
            }];
            //console.log(`Write ${point.title} -> ${point.value}`);
        } else if (Math.abs(this.data[index].value - point.value ) > 0.05) {
            this.data[index].value = point.value;
            //console.log(`Update ${point.title} -> ${point.value}`);
        } else {
            //console.log(`Same value ${point.title} -> ${point.value}`);
        }
    }
}

module.exports = new dataBuffer();