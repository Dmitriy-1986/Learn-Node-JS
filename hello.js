var http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Hello World\n');
}).listen(8080);

console.log('Server running at port 8080');
