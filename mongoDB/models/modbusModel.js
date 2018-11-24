const mongoose = require('mongoose');

const ModbusSchema = mongoose.Schema({
    title: String,
    address: Number,
    type: String,
    description: String,
    units: String,
    value: Number,
    trend: Boolean,
});

const modbusModel = mongoose.model('Modbus Model', ModbusSchema);
module.exports = modbusModel;


