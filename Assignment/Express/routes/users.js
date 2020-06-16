var express = require('express');
const parser = require('body-parser');
var usersRouter = express.Router();
const User = require('../models/user');
usersRouter.use(parser.json());

/* GET users listing. */
usersRouter.get('/', (request, response, next) => {
  response.send('respond with a resource');
});

usersRouter.post('/register', (request, response, next) => {
  User.findOne({ username: request.body.username })
    .then((user) => {
      if (user != null) {
        var err = new Error('User' + user + ' already exist!');
        err.status = 403;
        next(err);
      }
      else {
        return User.create({
          username: request.body.username,
          password: request.body.password
        })
      }

    })
    .then(user => {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.json({ status: 'Registered Successfully', user: user });
    }, err => next(err))
    .catch(err => next(err))
});

usersRouter.post('/login', (request, response, next) => {
  if (!request.session.user) {                    //checking if session is legit and have info
    var authHeader = request.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authorised');
      response.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];
    User.findOne({ username: username })
      .then((user) => {
        if (user === null) {
          var err = new Error('User ' + username + ' does\'nt exist.');
          err.status = 403;
          return next(err)
        }
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          return next(err)
        }
        else if (user.username === username && user.password === password) {
          request.session.user = 'authenticated';
          response.statusCode = 200;
          response.setHeader('Content-Type','text/plain');
          response.end('You are authorised.')
        }
      })
      .catch(err => next(err))
  }
  else{
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    response.end('You are already authorised.');
  }
});

usersRouter.get('/logout', (request, response) => {
  if(request.session){
    request.session.destroy();
    response.clearCookie('Session-ID');
    response.redirect('/');
  }
  else{
    var err = new Error('You are not logged in!');
    err.status =  403;
    next(err);
  }
})
module.exports = usersRouter;