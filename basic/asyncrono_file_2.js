console.log('inicia asyncrono');

const callback = function(err,data){
    if(!err) {
       console.log(data);
    }
};

var fs = require("fs");
fs.readFile('file.txt','utf8', callback);

console.log("termina");
