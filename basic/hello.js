var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200);
    res.write("Hola mundo Node.js");
    res.end();
}).listen(8080);
