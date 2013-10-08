var mongoose = require('mongoose'),
	Person = require('../models/Person'),
	env = process.env.NODE_ENV || 'development',
	config = require('../config/config')[env],
	winston = require('winston'),
	check = require('node-validator').check,
	S = require('string');

exports.token = {
	create: function (req, res, next) {
		res.send(501);
	},
	deactivate: function (req, res, next) {
		res.send(501);
	}
}

exports.user = {
	create: function(req, res, next) {
		check(req.body.email, 'Email cannot be empty').notEmpty();
		check(req.body.password, 'Email cannot be empty').len(8,32);

		// check if there's already a user
		Person.findOne({email: req.body.email}, function (err, result) {
			if(err)
				return next(err);

			if(result)
				res.send(400, {message: 'The e-mail address provided is in use'});

			var p = new Person({
				email: req.body.email,
				password: req.body.password
			});

			p.save(function (err, saved) {
				if (err)
					return next(err);

				// send a mail to the user?

				res.send(201);
			});
		});
	},
	edit: function (req, res, next) {
		res.send(501);
	},
	get: function (req, res, next) {
		res.send(501);
	},
	deactivate: function (req, res, next) {
		res.send(501);
	},
	all_goals: function (req, res, next) {
		res.send(501);
	}
}



exports.goal = {
	create: function (req, res, next) {
		res.send(501);
	},
	edit: function (req, res, next) {
		res.send(501);
	},
	deactivate: function (req, res, next) {
		res.send(501);
	},
	get: function (req, res, next) {
		res.send(501);
	}
}