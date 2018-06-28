const AVsModel = require('./models/AV.js');
const BVsModel = require('./models/BV.js');

class MongoDB {
    constructor() {
        this.AVsModel = AVsModel;
        this.BVsModel = BVsModel;
    }

    updateAV(av) {
        const query = { title: av.title };
        const update = {
            '$set': {
                value: av.value
            }
        };
        const options = {
            new: true
        };
        this.AVsModel.findOneAndUpdate(query, update, options, function(err,res) {
            if (err) {
                throw err;
            }
            // console.log(` ${query.title} updated to value: ${av.value}`)
        })
    }
    updateBV(bv) {
        const query = { title: bv.title };
        const update = {
            '$set': {
                value: bv.value
            }
        };
        const options = {
            new: true
        };
        this.BVsModel.findOneAndUpdate(query, update, options, function(err,res) {
            if (err) {
                throw err;
            }
            // console.log(` ${query.title} updated to value: ${bv.value}`)
        })
    }

    updateData(dataPoint) {
        if (dataPoint.title.search(/AV/i) !== -1) {
            this.updateAV(dataPoint);
        }
        if (dataPoint.title.search(/BV/i) !== -1) {
            this.updateBV(dataPoint);
        }
    }
}

module.exports = new MongoDB(AVsModel, BVsModel);
