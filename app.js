var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
var services = require('./services');
//var ninetd = require('./ninetestdir')(services);
services.bookshelf.user.fetchAll().then(function(users) {console.log(users); });

var routes = require('./routes/index');
var routes_user = require('./routes/user');

var app = express();

// application settings
services.i18nUrls.configure(app, i18n, {
  locales: ['el', 'en'],
  defaultLocale: 'el',
  cookie: process.env.npm_package_name + '_i18n_cookie',
  indent: ' '
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(services.i18nUrls.init);

// Passport
//var passport = require('passport');
//var expressSession = require('express-session');
//app.use(expressSession({secret: 'mySecretKey'}));
//app.use(passport.initialize());
//app.use(passport.session());

// Router
//app.use(services.i18nUrls.url(app, '/'), routes);
app.use('/', routes);
app.use('/user', routes_user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res/*, next*/) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res/*, next*/) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
