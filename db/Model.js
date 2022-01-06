const mongoose = require('mongoose');
const noteSchema = require('./Schema');

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;
