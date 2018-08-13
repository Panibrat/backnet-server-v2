const mongoose = require('mongoose');

const trendItemSchema = mongoose.Schema({
    timeStamp: Number,
    title: String,
    name: String,
    units: String,
    value: Number,
});

const trendItem = mongoose.model('Trend_Item', trendItemSchema);
module.exports = trendItem;
