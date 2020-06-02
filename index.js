const express = require('express');                     //requiring Express module
const http = require('http');
const morgan = require('morgan');                       // morgan is used of to log request, errors, etc in console
const parser = require('body-parser');                   //requiring body parser module to parse request body

const dishRouter = require('./routes/dishRouter');      //importing dishRouter from ./routes
const promoRouter = require('./routes/promoRouter');
const leadersRouter = require('./routes/leadersRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();                               //defining a variable to use express module

app.use(morgan('dev'));                              //using morgan
app.use(parser.json());                              //using parser
app.use('/dishes', dishRouter);                      // any request to /dishes will be handled by dishRouter
app.use('/promotions', promoRouter);
app.use('/leaders', leadersRouter);
app.use('/dishes/:dishId',dishRouter);                // any request to /dishes/:dishId will be handled by dishRouter
app.use('/promotions/:promoId', promoRouter);
app.use('/leaders/:leaderId', leadersRouter);

app.use(express.static(__dirname + '/public'));      //mapping static pages to request url

app.use((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','text/html');
    response.end('<html><body><h1>Express server running.</h1></body></html>')
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Express server running at http://${hostname}:${port}.`)
})