const express = require('express');
const parser = require('body-parser');
const leadersRouter = express.Router();
const Leaders = require('../models/leaders');
leadersRouter.use(parser.json());

leadersRouter.route('/')
    .get((request, response, next) => {
        Leaders.find({}).then((leaders) => {
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            response.json(leaders);
        }, err => next(err)).catch(err => next(err));
    })
    .post((request, response, next) => {
        Leaders.create(request.body).then((leader) => {
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            response.json(leader);
        }, err => next(err)).catch(err => next(err));
    })
    .put((request, response, next) => {
        response.statusCode = 403;
        response.end('PUT operation not supported on /leaders')
    })
    .delete((request, response, next) => {
        Leaders.remove({}).then((result) => {
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            response.json(result);
        }, err => next(err)).catch(err => next(err));
    });

leadersRouter.route('/:leaderId')
    .get((request, response, next) => {
        Leaders.findById(request.params.leaderId).then((leader) => {
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            response.json(leader);
        }, err => next(err)).catch(err => next(err));
    })
    .post((request, response, next) => {
        response.statusCode = 403;
        response.end('POST operation not supported on /leaders/leaderId ' + request.params.leaderId)
    })
    .put((request, response, next) => {
        Leaders.findByIdAndUpdate(request.params.leaderId,
            {$set: request.body},
            {new: true}).then((leader) => {
                response.statusCode = 200;
                response.setHeader('Content-Type','application/json');
                response.json(leader);
            }, err => next(err)).catch(err => next(err));
    })
    .delete((request, response, next) => {
        Leaders.findByIdAndRemove(request.params.leaderId).then((leader) => {
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            response.json(leader);
        }, err => next(err)).catch(err => next(err));
    });

module.exports = leadersRouter;