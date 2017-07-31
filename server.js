var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

require('./config/passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, function (err) {
  if (err) throw err;
  console.log('db connected');
});

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	  secret: process.env.SECRET_SESSION || 'superSecureSecret',
	  resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
      }),
    cookie: {maxAge: 30 * 86400 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/index')(app, passport);

var port = process.env.PORT || 3000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});

module.exports = app;
