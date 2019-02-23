var async = require('async');

async.series([
    function(callback) {
        console.log('start 1');
        callback(null, 'one');
    },
    function(callback) {
        console.log('start 2');
        callback(null, 'two');
    },
    function(callback) {
        console.log('start 3');
        callback(null, 'three');
    }
],
// optional callback
function(err, results) {
    console.log(results)
    // results is now equal to ['one', 'two']
});
