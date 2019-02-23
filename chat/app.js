var express = require('express');
var app = express();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + 'node_modules'));
app.use('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
    // next();
});

io.on('connection', function(socket){
    console.log('usuario conectado al chat');

    socket.on('chat', function(message){
        console.log(message);
        socket.broadcast.emit('chat_client', message);
        socket.emit('chat_client', message);
    });
});

http.listen(8000);
