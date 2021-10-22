var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//  抓資料要自己抓
// creat ejs 專案 由nodejs 泡出來
// 8-10
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/marian');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 26 34 連線mysql
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  var mysql = require("mysql");
  var connection = mysql.createConnection({
    // socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
    host: '127.0.0.1', 
    user: 'root', 
    password: 'root', 
    database: 'marian',
    multipleStatements:true

  });
// 自己打的 沒有連上就會有一個!!!no!!!
  connection.connect(function (err) {
    if (err) {
      console.log("!!! No !!!");
      throw err;
    } else {
      console.log('connected.')
    }
  });

  req.mysql = connection;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
