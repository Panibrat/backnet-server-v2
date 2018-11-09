const mongoose = require('mongoose');

const AVSchema = mongoose.Schema({
    title: String,
    name: String,
    description: String,
    status: String,
    units: String,
    value: Number,
    readOnly: Boolean,
});

const AVs = mongoose.model('Analog_Values', AVSchema);
module.exports = AVs;
