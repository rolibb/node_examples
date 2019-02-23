console.log('inicia asyncrono');

var fs = require("fs");
fs.readFile('file.txt','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
});
console.log("termina");
