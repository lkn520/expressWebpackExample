var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var reload = require('reload');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'dev') {
  // 开发模式
  app.use(express.static(path.join(__dirname, 'public')));

  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleare = require('webpack-hot-middleware');
  var webpackConfig = require('./config/webpack.dev.conf');
  var complier = webpack(webpackConfig);

  //webpack-dev-middleware  启动webpack
  app.use(webpackDevMiddleware(complier, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'warn'
  }));

  // webpack-hot-middleware 热更新
  app.use(webpackHotMiddleare(complier, {
    log: false,
    heartbeat: 2000
  }));

  reload(app);

  app.locals.env = 'dev';
} else {
  // 生产模式
  app.use(express.static(path.join(__dirname, 'static')));

  app.locals.env = 'prod';
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
