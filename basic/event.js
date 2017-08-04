var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();

logger.on('error', function(mensaje){
    console.log('Err: '+ mensaje);
});

logger.emit('error', 'al abrir archivo');
logger.emit('error', 'conexion de red');
