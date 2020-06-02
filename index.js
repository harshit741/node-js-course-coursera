const express = require('express');         //requiring Express module
const http = require('http');
const morgan = require('morgan');           // morgan is used of to log request, errors, etc in console
const parser = require('body-parser');      //requiring body parser module to parse request body
const dishRouter = require('./routes/dishRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();      //defining a variable to use express module
app.use(morgan('dev'));
app.use(parser.json());


app.get('/dishes/:dishId', (request, response, next) =>{
    response.end('Will send details of the dish: ' + request.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (request, response, next) => {
    response.statusCode = 403;
    response.end('POST operation not supported on /dished' + request.params.dishId)});

app.put('/dishes/:dishId', (request, response, next) => {
    response.write('Updating the dish ' + request.params.dishId + '\n ');
    response.end('Will update the dish' + request.body.name + ' with details ' + request.body.description);
});

app.delete('/dishes/:dishId',(request, response, next) => {
    response.end('Deleting dish!' + request.params.dishId);
});

app.use('/dishes', dishRouter);                     // any request to /dishes will be handled by dishRouter

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','text/html');
    response.end('<html><body><h1>Express server running.</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Express server running at http://${hostname}:${port}.`)
})