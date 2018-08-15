const mongoose = require('mongoose');
const { MAX_TREND_COLLECTION_SIZE } = require('../config');

const trendItemSchema = mongoose.Schema({
    timeStamp: Number,
    title: String,
    name: String,
    units: String,
    value: Number,
},
{
    capped: MAX_TREND_COLLECTION_SIZE, //limit size of collection (bytes)
});

const trendItem = mongoose.model('Trend_Item', trendItemSchema);
module.exports = trendItem;
