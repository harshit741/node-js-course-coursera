const express = require('express');
const parser = require('body-parser');
const dishRouter = express.Router();

dishRouter.use(parser.json());

dishRouter.route('/')                                   //creating routes for /
.all((request, response, next) => {                     //using dot (.) chained all with dishRouter.route
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    next();                                             //next() passes the request further to be used
})
.get((request, response, next) => {
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

dishRouter.route('/:dishId')                                   //creating routes for /dishes/:dishId
.all((request,response,next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    next();
})
.get((request, response, next) =>{
    response.end('Will send details of the dish: ' + request.params.dishId + ' to you!');
})
.post((request, response, next) => {
    response.statusCode = 403;
    response.end('POST operation not supported on /dishes ' + request.params.dishId)})
.put((request, response, next) => {
    response.write('Updating the dish ' + request.params.dishId + '\n ');
    response.end('Will update the dish ' + request.body.name + ' with details ' + request.body.description);
})
.delete((request, response, next) => {
    response.end('Deleting dish! ' + request.params.dishId);
});

module.exports = dishRouter;