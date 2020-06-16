var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leadersRouter');

var app = express();
const mongoose = require('mongoose');                       //requiring mongoose in Express app
const Dishes = require('./models/dishes');                  //requiring model
const url = 'mongodb://localhost:27017/conFusion';          //setting db url
const connect = mongoose.connect(url);

connect.then((db) => {                                      //connecting to db
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('secret-key'));                    //using cookie parser with sign
app.use(session({                                          // creating session
  name: 'Sessiod-ID',
  secret: 'Secret-key',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))
function auth(request, response, next) {
  console.log(request.session);

  if (!request.session.user) {                    //checking if session is legit and have info
    var authHeader = request.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authorised');
      response.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

    if (username === 'admin' && password === 'password') {              // creating session if new login 
      request.session.user = 'admin'                                    // 'user' in line 50 & 43 should be same
      next();                                                        
    }
    else {
      var err = new Error('You are not authorised');
      response.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else {                                                                  //if session has right info than login
    if (request.session.user === 'admin') {                            
      next();
    }
    else {
      var err = new Error('You are not authorised');
      response.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
}


app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/dishes/:dishId', dishRouter);
app.use('/promotions/:promoId', promoRouter);
app.use('/leaders/:leaderId', leaderRouter);

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
