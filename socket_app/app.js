var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('cliente conectado');

    socket.on('join', function(data) {
        console.log('cliente emition in "join"');
        console.log(data);

    });

    socket.on('messages', function(data) {
            console.log('mensage enviado del cliente');
            console.log(data);
           socket.emit('broad', data);
           socket.broadcast.emit('broad',data);
    });
});

server.listen(4200);
