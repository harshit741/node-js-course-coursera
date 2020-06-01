 const http = require('http');   //requiring core module of node 
 const hostname = 'localhost';   // declaring host
 const port = 3000;              // declaring port

 const server = http.createServer((request , response) => {
    console.log(request.headers);

    response.statusCode = 200;                                  //creating server and declaring response and request
    response.setHeader('Content-Type' , 'text/html');           //variables
    response.end('<html><body><h2>Hey there, Node devloper.</h2></body></html>');
 });
 server.listen(port , hostname , () => {
    console.log('Server running at http://' + hostname + ':' + port);       //starting server  on execution
});