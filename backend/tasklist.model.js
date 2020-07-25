const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tasks = new Schema({
	task_name: {
		type: String
	},
	task_created_date: {
		type: Date
	},
	task_end_date: {
		type: Date
	},
	archiveStatus: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('tasklist', Tasks);