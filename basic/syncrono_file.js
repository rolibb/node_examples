console.log('inicia syncrono');
var fs = require("fs");
var contenido_archivo = fs.readFileSync('file.txt','utf8');
console.log(contenido_archivo);
console.log("termina");
