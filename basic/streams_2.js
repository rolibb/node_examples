var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    var nuevo_archivo = fs.createWriteStream('file_uploaded.pdf');
    console.log(req);
    req.pipe(nuevo_archivo);
    req.on('end', function(){
        res.end('uploaded');
    });
}).listen(8080);
