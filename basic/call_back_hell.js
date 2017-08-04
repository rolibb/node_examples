var fs = require("fs");
var db = require('somedbfile.js');
var sendEmail = require('someEmail.js');
fs.readFile('async.js','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
    db.executeQuery('SELECT * FROM test',function(err,rows) {
      if(!err) {
        console.log("Error",err);
      }
      sendEmail(rows,function(err,data) {
        if(!err) {
          console.log("Error",err);
        }
        console.log("Operation done, i am in callback hell");
      });
    });
});
