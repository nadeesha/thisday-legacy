var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Person = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	token: {
		type: String
	},
	tokenExpiredOn: {
		type: String
	},
	_salt: {
		type: String
	},
	_hashed: {
		type: String
	}
	goals: [Goal]
});

Person.virtual('password').set(function(password) {
	this._salt = this.makeSalt();
	this._hashed = this.encryptPassword(password);
});

UserSchema.methods = {
	authenticate: function(password) {
		if (this._hashed == this.encryptPassword(password)) {
			return true;
		} else {
			return false;
		}
	},
	makeSalt: function() {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},
	encryptPassword: function(password) {
		if (!password) {
			return '';
		}

		try {
			var encrypted = crypto.createHmac('sha1', this._salt).update(password).digest('hex');
			return encrypted;
		} catch (err) {
			console.log(err);
			return '';
		}
	}
}

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