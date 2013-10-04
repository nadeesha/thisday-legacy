var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var Person = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		name: String,
		required: true
	},
	goals: [Goal]
});

var Goal = new Schema({
	name: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	createdOn: {
		type: Date,
		required: true
	},
	points: {
		type: Number,
		required: true
	}
});

mongoose.model(Goal, 'Goal');