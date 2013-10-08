
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/user/:userId/token', api.token.create);
app.del('/api/user/:userId/token', api.token.deactivate);

app.put('/api/user/:userId', api.user.create);
app.post('/api/user/:userId', api.user.edit);
app.get('/api/user/:userId', api.user.get);
app.del('/api/user/:userId', api.user.deactivate);
app.get('/api/user/:userId/goals', api.user.all_goals);

app.put('/api/user/:userId/goals', api.goal.create);
app.post('/api/user/:userId/goal/:goalId', api.goal.edit);
app.del('/api/user/:userId/goal/:goalId', api.goal.deactivate);
app.get('/api/user/:userId/goal/:goalId', api.goal.get);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
