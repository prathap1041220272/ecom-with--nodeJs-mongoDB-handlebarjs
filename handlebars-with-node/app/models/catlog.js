'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catlogSchema = new Schema({
	title: String,
	description: String,
	features: String
});

const Catlog = mongoose.model('Catlog', catlogSchema);
module.exports = Catlog;