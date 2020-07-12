const express = require('express');
const parser = require('body-parser');
const dishRouter = express.Router();
const Dishes = require('../models/dishes')              //requiring schema
const authenticate = require('../Authenticate');
const { authorize } = require('passport');
dishRouter.use(parser.json());

dishRouter.route('/')                                   //creating routes for '/'
    .get((request, response, next) => {
        Dishes.find({}).then((dishes) => {                   //using schema and storing data in docs
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dishes);
        }, (err) => next(err)).catch((err) => next(err));                     //pass any occuring error down to be caught at end
    })
    .post(authenticate.verifyUser,(request, response, next) => {
        Dishes.create(request.body).then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        }, (err) => next(err)).catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(request, response, next) => {
        response.statusCode = 403;
        response.end('PUT operation not supported on /dishes');
    })
    .delete(authenticate.verifyUser,(request, response, next) => {
        Dishes.remove({}).then((result) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(result);
        }, (err) => next(err)).catch((err) => next(err));
    });

dishRouter.route('/:dishId')                                   //creating routes for /dishes/:dishId
    .get((request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        }, (err) => next(err)).catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(request, response, next) => {
        response.statusCode = 403;
        response.end('POST operation not supported on /dishes ' + request.params.dishId)
    })
    .put(authenticate.verifyUser,(request, response, next) => {
        Dishes.findByIdAndUpdate(request.params.dishId, {
            $set: request.body
        }, { new: true }).then((dish) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(dish);
        }, (err) => next(err)).catch((err) => next(err));
    })
    .delete(authenticate.verifyUser,(request, response, next) => {
        Dishes.findByIdAndRemove(request.params.dishId).then((result) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(result);
        }, (err) => next(err)).catch((err) => next(err))
    });

dishRouter.route('/:dishId/comments')                                   //creating routes for '/'
    .get((request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {                   //using schema and storing data in docs
            if (dish != null) {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments);
            }
            else {
                err = new Error('Dish ' + request.params.dishId + ' not found.');
                err.statusCode = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));                     //pass any occuring error down to be caught at end
    })
    .post(authenticate.verifyUser,(request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {
            if (dish != null) {
                dish.comments.push(request.body);
                dish.save().then((dish) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(dish);
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + request.params.dishId + ' not found.');
                err.statusCode = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })
    .put(authenticate.verifyUser,(request, response, next) => {
        response.statusCode = 403;
        response.end('PUT operation not supported on dishes' + request.params.dishId + 'comments');
    })
    .delete(authenticate.verifyUser,(request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {
            if (dish != null) {
                for (var i = (dish.comments.length - 1); i >= 0; i--) {
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save().then((dish) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(dish);
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + request.params.dishId + ' not found.');
                err.statusCode = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    });

dishRouter.route('/:dishId/comments/:commentId')                                   //creating routes for /dishes/:dishId
    .get((request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {
            if (dish != null && dish.comments.id(request.params.commentId) != null) {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments.id(request.params.commentId));
            }
            else if (dish == null) {
                err = new Error('Dish ' + request.params.dishId + ' not found');
                err.statusCode = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' + request.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(request, response, next) => {
        response.statusCode = 403;
        response.end('POST operation not supported on /dishes/' + request.params.dishId + '/comments/' + request.params.commentId)
    })
    .put(authenticate.verifyUser,(request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {
            if (dish != null && dish.comments.id(request.params.commentId) != null) {
                if (request.body.rating) {
                    dish.comments.id(request.params.commentId).rating = request.body.rating;
                }
            }
            if (request.body.comment) {
                dish.comments.id(request.params.commentId).comment = request.body.comment;
            }
            else if (dish == null) {
                err = new Error('Dish ' + request.params.dishId + ' not found');
                err.statusCode = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' + request.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
            dish.save().then((dish) => {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(dish.comments.id(request.params.commentId))
            })
        }, (err) => next(err)).catch((err) => next(err));
    })
    .delete(authenticate.verifyUser,(request, response, next) => {
        Dishes.findById(request.params.dishId).then((dish) => {
            if (dish != null && dish.comments.id(request.params.commentId) != null) {
                dish.comments.id(request.params.commentId).remove();
                dish.save().then((dish) => {
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/json');
                    response.json(dish);
                }, (err) => next(err));
            }
            else if (dish == null) {
                err = new Error('Dish ' + request.params.dishId + ' not found');
                err.statusCode = 404;
                return next(err);
            }
            else {
                err = new Error('Comment ' + request.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }

        }, (err) => next(err)).catch((err) => next(err))
    });
module.exports = dishRouter;