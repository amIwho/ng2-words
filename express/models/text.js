const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  text: String,
  date: Date,
  created_at: {
    type: Date,
    "default": Date.now
  },
  updated_at: Date
});

textSchema.pre('save', (next) => {
  "use strict";
  const curDate = new Date();
  this.updated_at = curDate;
  if (!this.created_at) {
    this.created_at = curDate;
  }
  next();
});

const TextModel = mongoose.model('Text', textSchema);

module.exports = TextModel;
