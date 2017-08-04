var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200);
    req.on('data', function(chunk){
        res.write(chunk);
        // console.log(chunk.toString());
    });

    req.on('end', function(){
        res.end();
    })
    // res.write("El gato esta comiendo");
    // setTimeout(function(){
    //     res.write("el gato acabo de comer");
    //     res.end();
    //
    // }, 10000);

    // req.pipe(res);

}).listen(8080);
