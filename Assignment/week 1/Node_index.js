 const http = require('http');   //requiring http core module of node 
 const file = require('fs');     // file system core module R/W file from local
 const path = require('path');   // Path core module to tell path of local
 const hostname = 'localhost';   // declaring host
 const port = 3000;              // declaring port

 const server = http.createServer((request , response) => {
    console.log("Request for " + request.url + ' by method ' + request.method);

    // response.statusCode = 200;                                  //creating server and declaring response and request
    // response.setHeader('Content-Type' , 'text/html');           //variables
    // response.end('<html><body><h2>Hey there, Node devloper.</h2></body></html>');

    if(request.method == 'GET'){                            // Checks the method of request
        var fileUrl;
        if(request.url == '/'){
            fileUrl = '/index.html'
        }
        else{
            fileUrl = request.url;
        }

        var filePath = path.resolve('./public' + fileUrl);      //maps requested url to destined file, request handling and errors
        const fileExt = path.extname(filePath);
        if(fileExt == '.html') {                                // checks for valid file type
            file.exists(filePath , (exists) => {                 //check if file exists or not
                console.log(exists);
                if(!exists){                                     // error if file doesn't exists
                    response.statusCode = 404;
                    response.setHeader('Content-Type' , 'text/html');
                    response.end('<html><body><h1>Error 404: ' + fileUrl + 
                                ' not found </h1></body></html>')
                    return;
                }      
                response.code = 200;                                // serves if valid type exists
                response.setHeader('Content-Type' , 'text/html');
                file.createReadStream(filePath).pipe(response);
            });
        }
        else{                                                     // error if valid file type doesn't exists  
            response.code = 404;
            response.setHeader('Content-Type' , 'text/html');
            response.end('<html><body><h1>Error ' + response.code + '\n' + 
                         fileUrl + ' not a valid file type</h1></body></html>');
        }
    }
    else{                                                        // Error if invalid http method
        response.code = 404;
        response.setHeader('Content-Type' , 'text/html');
        response.end('<html><body><h1>Error ' + response.code + '\n' + 
                     request.method + 'method not supported</h1></body></html>');
    }
 });
 server.listen(port , hostname , () => {
    console.log('Server running at http://' + hostname + ':' + port);       //starting server  on execution
}); 