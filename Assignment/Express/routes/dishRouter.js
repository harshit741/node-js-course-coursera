const express = require('express');
const parser = require('body-parser');
const dishRouter = express.Router();
const Dishes = require('../models/dishes')              //requiring schema
dishRouter.use(parser.json());

dishRouter.route('/')                                   //creating routes for '/'
.get((request, response, next) => {
    Dishes.find({}).then((dishes) => {                   //using schema and storing data in docs
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dishes);
    },(err) => next(err)).catch((err) => next(err));                     //pass any occuring error down to be caught at end
})
.post((request, response, next) => {
    Dishes.create(request.body).then((dish) => {
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dish);
    },(err) => next(err)).catch((err) => next(err));
})
.put((request, response, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((request, response, next) => {
    Dishes.remove({}).then((result) => {
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(result);
    },(err) => next(err)).catch((err) => next(err));
});

dishRouter.route('/:dishId')                                   //creating routes for /dishes/:dishId
.get((request, response, next) =>{
    Dishes.findById(request.params.dishId).then((dish) => {
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dish);
    },(err) => next(err)).catch((err) => next(err));
})
.post((request, response, next) => {
    response.statusCode = 403;
    response.end('POST operation not supported on /dishes ' + request.params.dishId)})
.put((request, response, next) => {
    Dishes.findByIdAndUpdate(request.params.dishId, {
        $set: request.body
    }, { new: true}).then((dish) => {
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(dish);
    },(err) => next(err)).catch((err) => next(err));
})
.delete((request, response, next) => {
    Dishes.findByIdAndRemove(request.params.dishId).then((result) => {
        response.statusCode = 200;
        response.setHeader('Content-Type','application/json');
        response.json(result);
    },(err) => next(err)).catch((err) => next(err))
});

module.exports = dishRouter;