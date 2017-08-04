var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    var nuevo_archivo = fs.createWriteStream('file_uploaded_progress.pdf');
    var totalBytes = req.headers['content-length'];
    var uploadedbytes = 0;
    req.pipe(nuevo_archivo);
    req.on('data', function(pedazo_archivo){
        uploadedbytes += pedazo_archivo.length;
        var progress = (uploadedbytes/totalBytes) * 100;
        res.write('progress: ' + parseInt(progress, 10) + "%\n");
    });

    req.on('end', function(){
        res.end('uploaded');
    });
}).listen(8080);
