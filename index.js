console.log("Hello World!");

const http = require('http');
const url = require('url');


const server = http.createServer((request, response)=> {
    // console.log(request);
    const path = url.parse(request.url);
    const method = request.method.toUpperCase();
        if(method === 'GET') {
            if(path.pathname === '/') {
                response.end("Welcome to my server!!!");
            } else if (path.pathname === '/aboutus') {
                response.end("We are 10x academy students");
            } else {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.end("route not found");
            }
        } else if (method === 'POST') {

    }
});

server.listen(3000);