'use strict';

const mongoose = require('mongoose');

const {Schema} = mongoose;

const searchSchema = new Schema ({
  timestamp: String,
  query: String,
  data: Array
});

const searchModel = mongoose.model('Search', searchSchema);

module.exports = searchModel;
