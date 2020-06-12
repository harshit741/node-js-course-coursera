const express = require('express');
const parser = require('body-parser');
const promoRouter = express.Router();
const Promotions = require('../models/promotions');
promoRouter.use(parser.json());

promoRouter.route('/')
    .get((request, response, next) => {
        Promotions.find({}).then((promotions) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(promotions);
        }, (err) => next(err)).catch((err) => next(err));
    })
    .post((request, response, next) => {
        Promotions.create(request.body).then((promotion) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(promotion);
        }, (err) => next(err)).catch((err) => next(err));
    })
    .put((request, response, next) => {
        response.statusCode = 403;
        response.end('PUT operation not supported on /promtions')
    })
    .delete((request, response, next) => {
        Promotions.remove({}).then((result) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(result);
        }, (err) => next(err)).catch((err) => next(err));
    });

promoRouter.route('/:promoId')
    .get((request, response, next) => {
        Promotions.findById(request.params.promoId).then((promotion) => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.json(promotion);
        }, err => next(err)).catch(err => next(err));
    })
    .post((request, response, next) => {
        response.statusCode = 403;
        response.end('POST operation not supported on /promotions ' + request.params.promoId);
    })
    .put((request, response, next) => {
        Promotions.findByIdAndUpdate(request.params.promoId,
            { $set: request.body },
            { new: true }).then((promotion) => {
                response.statusCode = 200;
                response.setHeader('Content-Type','application/json');
                response.json(promotion);
            }, err => next(err)).catch(err => next(err));
    })
    .delete((request, response, next) => {
        Promotions.findByIdAndRemove(request.params.promoId).then((promtion) => {
            response.statusCode = 200;
            response.setHeader('Content-Type','application/json');
            response.json(promtion);
        }, err => next(err)).catch(err => next(err));
    });

module.exports = promoRouter;