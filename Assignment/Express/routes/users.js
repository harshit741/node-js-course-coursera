var express = require('express');
const parser = require('body-parser');
var usersRouter = express.Router();
const User = require('../models/user');
usersRouter.use(parser.json());
var passport = require('passport');
var authenticate = require('../Authenticate');
/* GET users listing. */
usersRouter.get('/', (request, response, next) => {
  response.send('respond with a resource');
});

usersRouter.post('/register', (request, response, next) => {
  User.register(new User({ username: request.body.username }),
    request.body.password, (err, user) => {
      if (err) {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'application/json');
        response.json({ err: err });
      }
      else {
        if (request.body.firstname && request.body.lastname)
          user.firstname = request.body.firstname;
        user.lastname = request.body.lastname;
        user.save((err, user) => {
          if (err) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.json({ err: err });
            return;
          }
          passport.authenticate('local')(request, response, () => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json({ success: true, status: 'Registered Successfully' });
          });
        })
      }
    });
});

usersRouter.post('/login', passport.authenticate('local'), (request, response) => {
  var token = authenticate.getToken({ _id: request.user._id })
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

usersRouter.get('/logout', (request, response, next) => {
  if (request.session) {
    request.session.destroy();
    response.clearCookie('Session-ID');
    response.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
})
module.exports = usersRouter;