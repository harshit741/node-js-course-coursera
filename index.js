const express = require('express');         //requiring Express module
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();      //defining a variable to use express module
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    response.statusCode = 200;
    response.setHeader('Content-Type' , 'text/html');
    response.end('<html><body><h1>Express server running.</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Express server running at http://${hostname}:${port}.`)
})