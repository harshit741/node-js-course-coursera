const express = require('express');
const parser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(parser.json());
dishRouter.route('/')
.all((request, response, next) => {                     //using dot (.) chained all with dishRouter.route
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    next();                                             //next() passes the request further to be used
})
.get((request, response, next) =>{
    response.end('Will send all the dishes to you!');
})
.post((request, response, next) => {
    response.end('Will add the dish: ' + request.body.name + ' with details ' + request.body.description);
})
.put((request, response, next) => {
    response.statusCode = 403;
    response.end('PUT operation not supported!')
})
.delete((request, response, next) => {
    response.end('Deleting all dishes!');
});

module.exports = dishRouter;