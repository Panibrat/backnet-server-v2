const mongoose = require('mongoose');

const BVSchema = mongoose.Schema({
  title: String,
  name: String,
  description: String,
  status: String,
  value: Boolean,
  readOnly: Boolean
});

const BVs = mongoose.model('Binary_Values', BVSchema);
module.exports = BVs;
