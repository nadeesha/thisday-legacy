var mongoose = require('mongoose'),
	Person = require('../models/Person'),
	env = process.env.NODE_ENV || 'development',
	config = require('../config/config')[env],
	winston = require('winston'),
	S = require('string');


exports.create_goal = function(req, res) {

};