const express = require('express');
const parser = require('body-parser');
const leadersRouter = express.Router();

leadersRouter.use(parser.json());

leadersRouter.route('/')
.all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    next();
})
.get((request, response, next) => {
    response.end('Will send all the leaders to you!');
})
.post((request, response, next) => {
    response.end('Will add the leaders: ' + request.body.name + ' with details ' + request.body.description);
})
.put((request, response, next) => {
    response.statusCode = 403;
    response.end('PUT operation not supported!')
})
.delete((request, response, next) => {
    response.end('Deleting all leaders!');
});

leadersRouter.route('/:leaderId')
.all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','text/plain');
    next(); 
})
.get((request, response, next) =>{
    response.end('Will send details of the leader: ' + request.params.leaderId + ' to you!');
})
.post((request, response, next) => {
    response.statusCode = 403;
    response.end('POST operation not supported on /leaders/leaderId ' + request.params.leaderId)})
.put((request, response, next) => {
    response.write('Updating the leader ' + request.params.leaderId + '\n ');
    response.end('Will update the leader ' + request.body.name + ' with details ' + request.body.description);
})
.delete((request, response, next) => {
    response.end('Deleting leader ' + request.params.leaderId);
});

module.exports = leadersRouter;